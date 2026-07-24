import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(true);
  const [timerFinished, setTimerFinished] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return !!(window as any).__animationFramesLoaded;
    }
    return false;
  });

  useEffect(() => {
    const t = setTimeout(() => setTimerFinished(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (assetsLoaded) return;

    const handleLoaded = () => {
      setAssetsLoaded(true);
    };

    window.addEventListener("animation-frames-loaded", handleLoaded);
    if (typeof window !== "undefined" && (window as any).__animationFramesLoaded) {
      setAssetsLoaded(true);
    }

    return () => {
      window.removeEventListener("animation-frames-loaded", handleLoaded);
    };
  }, [assetsLoaded]);

  useEffect(() => {
    if (timerFinished && assetsLoaded) {
      setShow(false);
    }
  }, [timerFinished, assetsLoaded]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          (window as any).__loaderFinished = true;
          window.dispatchEvent(new CustomEvent("loader-finished"));
        }
      }}
    >
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
        >
          <div className="text-center px-4">
            <div className="flex items-center justify-center min-h-[140px] mb-4">
              <motion.h1
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[color:var(--ink)] font-normal tracking-wide select-none"
                style={{ fontFamily: "'Kristi', cursive", lineHeight: "1.2" }}
              >
                Roshni Dhimar
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="hand text-2xl text-[color:var(--ink-soft)]"
            >
              opening the notebook…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
