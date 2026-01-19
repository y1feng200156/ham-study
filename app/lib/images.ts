export interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

const root = "../assets";

// 1. Demos Configuration (Thumbnail sizes)
const demoImages = import.meta.glob<ImageMetadata[]>(
  "../assets/images/demos/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: "400;800;1200", format: "webp", as: "metadata" },
  },
);

// 2. Placeholder Configuration (Unified low-quality blur)
// 2. Placeholder Configuration (Unified low-quality blur)
const blurImages = import.meta.glob(
  "../assets/images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: 20, blur: 2, quality: 100, format: "webp", as: "base64" },
  },
);

// Helper: Normalize path to match glob keys
function normalizeKey(path: string) {
  // Remove leading slash if present
  return path.startsWith("/") ? path.slice(1) : path;
}

// Generic Resolver
function resolveAsset<T>(glob: Record<string, T>, path: string): T | null {
  const normalized = normalizeKey(path);
  // Construct full expected path (relative to this file)
  const targetPath = `${root}/${normalized}`;

  // Try specific extensions directly instead of iterating all keys
  // This is faster (O(1) lookup vs O(N) search) and stricter
  const extensions = [".png", ".jpg", ".jpeg", ".webp"];

  for (const ext of extensions) {
    const fullKey = `${targetPath}${ext}`;
    if (fullKey in glob) {
      const mod = glob[fullKey];
      // @ts-expect-error - Vite module default export handling
      return (mod?.default ?? mod) as T;
    }
  }

  return null;
}

export const ImageSizes = {
  // Common Size Presets for Layouts
  GRID_3_COL: "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw",
  BANNER_FULL: "100vw",
};

// 3. Unified Image Repository
// Merge all image configurations here.
// When adding new folders (e.g. banners), define a new glob above and spread it here.
const imageRepository = {
  ...demoImages,
  // ...bannerImages,
};

export function getImageProps(path: string) {
  // 1. Try resolving from the unified repository
  // This lookup is content-agnostic (demos, banners, etc. all work)
  const metadata = resolveAsset(imageRepository, path);

  // Fallback: If no metadata found, assume path is direct resource or failed
  if (!metadata) {
    return { src: path, srcSet: undefined, placeholder: undefined };
  }

  // 2. Resolve Placeholder
  const placeholder = resolveAsset(blurImages as Record<string, string>, path);

  // 3. Process Metadata into src/srcSet
  if (Array.isArray(metadata)) {
    const sorted = [...metadata].sort((a, b) => a.width - b.width);
    const srcSet = sorted.map((img) => `${img.src} ${img.width}w`).join(", ");
    const mainSrc = sorted[sorted.length - 1].src; // Largest as fallback

    return {
      src: mainSrc,
      srcSet,
      placeholder,
    };
  }

  // Should not happen with current glob config, but safety check
  return { src: path, srcSet: undefined, placeholder };
}
