import { useState, useEffect, useRef } from "react";

// Dynamically discover all frames in the asset directory at build time.
// Vite compiles these into hashed static assets.
const allFramesGlob = import.meta.glob<{ default: string }>(
  "../assets/rosh with cat/ezgif-frame-*.png",
  { eager: true }
);

// Extract and sort the frame URL paths alphabetically (safe due to padded numbering)
const allFrameUrls = Object.keys(allFramesGlob)
  .sort()
  .map((key) => allFramesGlob[key].default);

export function FrameVideoPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [preloadingFinished, setPreloadingFinished] = useState(false);
  const [isLoaderFinished, setIsLoaderFinished] = useState(() => {
    if (typeof window !== "undefined") {
      return !!(window as any).__loaderFinished;
    }
    return false;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const loadingQueueRef = useRef<string[]>([]);
  const isDestroyedRef = useRef(false);

  // Load every 2nd frame for 50% lower network usage (125 frames total),
  // which matches our cozy 12 FPS animation rate perfectly (10 seconds loop).
  const activeFrameUrls: string[] = [];
  for (let i = 0; i < allFrameUrls.length; i += 2) {
    activeFrameUrls.push(allFrameUrls[i]);
  }

  const totalFrames = activeFrameUrls.length;

  // Listen for the loading screen to disappear
  useEffect(() => {
    if (isLoaderFinished) return;

    const handleFinished = () => {
      setIsLoaderFinished(true);
    };

    window.addEventListener("loader-finished", handleFinished);
    if (typeof window !== "undefined" && (window as any).__loaderFinished) {
      setIsLoaderFinished(true);
    }

    return () => {
      window.removeEventListener("loader-finished", handleFinished);
    };
  }, [isLoaderFinished]);

  // 1. Setup parallel image loading and decoding logic
  useEffect(() => {
    isDestroyedRef.current = false;
    setLoadedCount(0);
    setPreloadingFinished(false);

    // Create parallel loading promises
    const promises = activeFrameUrls.map((url) => {
      return preloadImage(url)
        .then((img) => {
          if (!isDestroyedRef.current) {
            setLoadedCount((prev) => prev + 1);
          }
          return img;
        })
        .catch((err) => {
          console.error("Failed to load frame URL:", url, err);
          return null;
        });
    });

    // Wait for all frames to be fully loaded and decoded
    Promise.all(promises).then(() => {
      if (!isDestroyedRef.current) {
        setPreloadingFinished(true);
        if (typeof window !== "undefined") {
          (window as any).__animationFramesLoaded = true;
          window.dispatchEvent(new CustomEvent("animation-frames-loaded"));
        }
        drawFrame(0);
      }
    });

    return () => {
      isDestroyedRef.current = true;
    };
  }, []);

  // Helper to preload a single image, decode it, and cache it in the ref
  const preloadImage = (url: string): Promise<HTMLImageElement> => {
    if (imagesRef.current[url]) {
      return Promise.resolve(imagesRef.current[url]);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = async () => {
        try {
          await img.decode();
          imagesRef.current[url] = img;
          resolve(img);
        } catch (e) {
          // Fallback: if decode fails, cache and resolve anyway so we don't block playback
          imagesRef.current[url] = img;
          resolve(img);
        }
      };
      img.onerror = (e) => reject(e);
    });
  };

  // 2. Playback Loop (Constant speed of 12 FPS)
  useEffect(() => {
    if (!isLoaderFinished) return;

    const baseFps = 12; // Cozier frame rate matching the sketch style
    const frameInterval = 1000 / baseFps;
    lastFrameTimeRef.current = 0;

    const updateFrame = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameInterval) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= totalFrames ? 0 : nextIndex;
        });
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
      }

      animationRef.current = requestAnimationFrame(updateFrame);
    };

    animationRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [totalFrames, isLoaderFinished]);

  // Draw frame on canvas whenever current index changes
  useEffect(() => {
    drawFrame(currentIndex);
  }, [currentIndex]);

  // Handle canvas drawing with cover aspect ratio scaling
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const url = activeFrameUrls[index];
    const img = imagesRef.current[url];

    // Fallback search to find closest loaded frame to avoid flickering while loading
    let frameImg = img;
    if (!frameImg) {
      for (let i = index; i >= 0; i--) {
        const fallbackUrl = activeFrameUrls[i];
        if (imagesRef.current[fallbackUrl]) {
          frameImg = imagesRef.current[fallbackUrl];
          break;
        }
      }
    }
    if (!frameImg) {
      for (let i = 0; i < totalFrames; i++) {
        const fallbackUrl = activeFrameUrls[i];
        if (imagesRef.current[fallbackUrl]) {
          frameImg = imagesRef.current[fallbackUrl];
          break;
        }
      }
    }

    if (!frameImg) return;

    // Align canvas buffer resolution to CSS display size for crisp pixels
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = frameImg.naturalWidth || frameImg.width;
    const ih = frameImg.naturalHeight || frameImg.height;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let dw = cw;
    let dh = ch;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > imgRatio) {
      dh = cw / imgRatio;
      dy = (ch - dh) / 2;
    } else {
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(frameImg, dx, dy, dw, dh);
  };

  const percentLoaded = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-xl bg-transparent select-none">
      {/* 1. Canvas layer for video playback. Click bubbles up to parent to flip card. */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover cursor-pointer block"
      />

      {/* Cozy Vignette and Paper Blend Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.15)_95%)] mix-blend-multiply opacity-70" />
      <div className="absolute inset-0 pointer-events-none bg-paper opacity-5 mix-blend-overlay" />

      {/* 2. Cozy minimal loading progress line at the top (no text overlay) */}
      {!preloadingFinished && (
        <div className="absolute top-0 inset-x-0 h-1 bg-stone-700/20 pointer-events-none">
          <div 
            className="h-full bg-[color:var(--rose-deep)] transition-all duration-300 ease-out"
            style={{ width: `${percentLoaded}%` }}
          />
        </div>
      )}
    </div>
  );
}
