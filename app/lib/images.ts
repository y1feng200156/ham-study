export interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

// 1. Demos Configuration (Thumbnail sizes)
const demoImages = import.meta.glob<ImageMetadata[]>(
  "../assets/images/demos/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: "400;800;1200", format: "webp", as: "metadata" },
  }
);

// 2. Placeholder Configuration (Unified low-quality blur)
const blurImages = import.meta.glob(
  "../assets/images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: 20, blur: 5, quality: 10, format: "webp", as: "url" },
  }
);

// Helper: Normalize path to match glob keys
function normalizeKey(path: string) {
  // Remove leading slash if present
  return path.startsWith("/") ? path.slice(1) : path;
}

// Generic Resolver
function resolveAsset<T>(glob: Record<string, T>, path: string): T | null {
  const normalized = normalizeKey(path);
  // Try to find key that includes the path (e.g. "demos/vertical" in ".../demos/vertical.webp")
  const key = Object.keys(glob).find(
    (k) => k.includes(`/${normalized}.`) || k.includes(`/${normalized}/`)
  );
  if (!key) return null;

  const mod = glob[key];
  // @ts-expect-error - Vite module default export handling
  return (mod?.default ?? mod) as T;
}

export const ImageSizes = {
  // Common Size Presets for Layouts
  GRID_3_COL: "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw",
  BANNER_FULL: "100vw",
};

export function getImageProps(path: string) {
  // Detect Type based on path (Simple folder-based routing)
  // Currently we only have 'demos', but logic is extensible
  let metadata: ImageMetadata[] | null = null;

  // 1. Try Demos
  if (path.includes("demos/")) {
    metadata = resolveAsset(demoImages, path);
  }
  // Future: else if (path.includes("banners/")) { ... }

  // Fallback: If no specific config found, try resolving in demos anyway or return null/raw
  if (!metadata) {
    // Attempt fallback lookups if strict folder matching isn't desired,
    // or assume path is a direct URL if not found.
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

  console.log("metadata", metadata);
  console.log("placeholder", placeholder);
  // Should not happen with current glob config, but safety check
  return { src: path, srcSet: undefined, placeholder };
}
