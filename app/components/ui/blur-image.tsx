import { ImageBrokenIcon } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "~/lib/utils";

export interface BlurImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /**
   * Image source URL (local or external)
   * Local: "/images/hero.jpeg"
   * External: "https://example.com/image.jpg"
   */
  src: string;

  /**
   * Image width (required for proper sizing)
   */
  width?: number;

  /**
   * Image height (required for proper sizing)
   */
  height?: number;

  /**
   * Placeholder mode
   * - "blur": Auto-generate blur placeholder
   * - "empty": No placeholder
   * - Custom base64 string: Use provided placeholder
   */
  placeholder?: "blur" | "empty" | string;

  /**
   * Additional CSS classes for container
   */
  className?: string;

  /**
   * Additional CSS classes for img element
   */
  imgClassName?: string;
}

/**
 * BlurImage component with automatic blur placeholder
 * Similar to next/image but works with IPX
 */
// Import all local images
// Import all local images
const mainImages = import.meta.glob<ImageMetadata[]>(
  "../../assets/images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: "400;800;1200", format: "webp", as: "metadata" },
  },
);

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

const blurImages = import.meta.glob(
  "../../assets/images/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: { w: 20, blur: 5, quality: 10, format: "webp", as: "url" },
  },
);

function resolveAsset<T>(glob: Record<string, T>, path: string): T | null {
  // Try to match the path in the glob keys
  // path example: "demos/vertical-polarization"
  // glob keys example: "../../assets/images/demos/vertical-polarization.webp"
  const key = Object.keys(glob).find(
    (k) => k.includes(`/${path}.`) || k.includes(`/${path}/`),
  );
  if (!key) return null;
  const mod = glob[key];
  // @ts-expect-error - Vite module structure
  return (mod?.default ?? mod) as T;
}

export function BlurImage({
  src,
  width,
  height,
  placeholder,
  className,
  imgClassName,
  alt,
  sizes = "(max-width: 48rem) 100vw, 860px",
  ...props
}: BlurImageProps & { sizes?: string }) {
  // Resolve local assets if src is not a URL
  const isExternal = src.startsWith("http") || src.startsWith("data:");

  const resolvedData = useMemo(() => {
    if (isExternal) return src;
    // Remove leading slash if present for lookup
    const lookupPath = src.startsWith("/") ? src.slice(1) : src;
    return resolveAsset(mainImages, lookupPath) || src;
  }, [src, isExternal]);

  const { mainSrc, srcSet } = useMemo(() => {
    if (Array.isArray(resolvedData)) {
      // It's metadata array
      const sorted = [...resolvedData].sort((a, b) => a.width - b.width);
      const srcSetString = sorted
        .map((img) => `${img.src} ${img.width}w`)
        .join(", ");
      const fallback = sorted[sorted.length - 1].src; // Use largest as fallback
      return { mainSrc: fallback, srcSet: srcSetString };
    }
    return { mainSrc: resolvedData as string, srcSet: undefined };
  }, [resolvedData]);

  const resolvedPlaceholder = useMemo(() => {
    if (typeof placeholder === "string" && placeholder !== "empty")
      return placeholder;
    if (isExternal) return null;

    // Remove leading slash if present for lookup
    const lookupPath = src.startsWith("/") ? src.slice(1) : src;
    // Cast to unknown to match generic constraint or let inference work if I fix definition
    return resolveAsset(
      blurImages as Record<string, unknown>,
      lookupPath,
    ) as string;
  }, [src, placeholder, isExternal]);

  const isValidSrc = typeof mainSrc === "string" && mainSrc.length > 0;
  const finalPlaceholder = resolvedPlaceholder;

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const currentUrlRef = useRef<string>("");

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoaded(true); // Stop showing placeholder on error
  }, []);

  // Check if image is already loaded (cached images) or URL changed
  useEffect(() => {
    if (!isValidSrc || !mainSrc) return;

    // If URL changed, reset state
    if (currentUrlRef.current !== mainSrc) {
      currentUrlRef.current = mainSrc;
      setIsLoaded(false);
      setError(false);
    }

    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        // If complete but no width, it's likely an error that happened before hydration
        handleError();
      }
      return;
    }

    // Use a small delay to ensure img element has been updated with new src
    // This allows placeholder to show first
    const timeoutId = setTimeout(() => {
      const img = imgRef.current;
      if (img?.src) {
        // Get the actual loaded image URL
        const imgSrc = img.currentSrc || img.src;
        // Extract the path part from mainSrc for comparison
        const mainImagePath = mainSrc.split("/").slice(-2).join("/"); // Get last 2 parts
        const imgPath = imgSrc.split("/").slice(-2).join("/");

        // Check if the image src matches and is already loaded (cached)
        if (imgPath === mainImagePath || imgSrc?.includes(mainImagePath)) {
          // If image is already loaded (cached), trigger load immediately
          if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            setIsLoaded(true);
          }
        }
      }
    }, 50); // Small delay to allow placeholder to render first

    return () => clearTimeout(timeoutId);
  }, [mainSrc, handleError, isValidSrc]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder (blur) */}
      {finalPlaceholder && !error && isValidSrc && (
        <img
          src={finalPlaceholder}
          alt={alt || ""}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out",
            isLoaded ? "opacity-0" : "opacity-100",
          )}
          onError={handleError}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isValidSrc && mainSrc && (
        <img
          ref={imgRef}
          src={mainSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={props.loading || "lazy"}
          {...props}
        />
      )}

      {/* Error fallback */}
      {(error || !isValidSrc) && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400"
          title="Failed to load image"
        >
          <ImageBrokenIcon className="size-[20%] max-h-20 min-h-8 max-w-20 min-w-8" />
        </div>
      )}
    </div>
  );
}
