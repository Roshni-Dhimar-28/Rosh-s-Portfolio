import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import sticker assets
import stickerCat from "@/assets/inspos/sticker cat.png";
import stickerCat2 from "@/assets/inspos/sticker cat 2.png";
import stickerCat3 from "@/assets/inspos/sticker cat 3.png";
import stickerCat4 from "@/assets/inspos/sticker cat 4.png";
import stickerDog from "@/assets/inspos/sticker dog.png";
import stickerDog2 from "@/assets/inspos/sticker dog 2.png";
import stickerPaws from "@/assets/inspos/sticker paws.png";
import stickerRose from "@/assets/inspos/sticker rose.png";
import stickerRosh from "@/assets/inspos/sticker rosh.png";
import stickerRosh2 from "@/assets/inspos/sticker rosh 2.png";
import doodleCoffee from "@/assets/inspos/doodle cold coffee.png";
import doodleFlower from "@/assets/inspos/doodle flower.png";

const STICKER_POOL = [
  stickerCat,
  stickerCat2,
  stickerCat3,
  stickerCat4,
  stickerDog,
  stickerDog2,
  stickerPaws,
  stickerRose,
  stickerRosh,
  stickerRosh2,
  doodleCoffee,
  doodleFlower,
];

interface Sticker {
  id: number;
  x: number;
  y: number;
  src: string;
  rotate: number;
  scale: number;
}

export function StickersCanvas() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [showTip, setShowTip] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide tip automatically after 8 seconds
    const timer = setTimeout(() => setShowTip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore clicks on buttons, links, inputs, nav elements, or existing stickers/cards
      const target = e.target as HTMLElement;
      if (
        target.closest(
          "a, button, input, textarea, select, [role='button'], .sticker-stamp, header, nav, .paper-card, .sticky-note, .tape, .cursor-grab"
        )
      ) {
        return;
      }

      // Add a sticker
      const x = e.pageX;
      const y = e.pageY;
      const id = Date.now() + Math.random();
      const src = STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];
      const rotate = (Math.random() - 0.5) * 60; // -30 to 30 deg
      const scale = 0.7 + Math.random() * 0.4; // 0.7 to 1.1

      setStickers((prev) => [...prev, { id, x, y, src, rotate, scale }]);
      setShowTip(false);
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  const removeSticker = (id: number) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const clearStickers = () => {
    setStickers([]);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-30 overflow-visible">
      {/* Floating interactive instructions banner */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-[color:var(--butter)] text-[color:var(--ink)] border-2 border-[color:var(--ink)] px-5 py-2.5 rounded-lg shadow-lg z-50 text-center hand pointer-events-auto select-none flex items-center gap-2 max-w-sm rotate-[-1deg]"
          >
            <span className="text-xl">🎨</span>
            <div>
              <p className="font-bold text-sm">Stamp Mode Active!</p>
              <p className="text-xs text-[color:var(--ink-soft)] leading-snug">
                Click empty space to slap a sticker. Drag them, double-click to remove!
              </p>
            </div>
            <button
              onClick={() => setShowTip(false)}
              className="text-lg hover:scale-115 transition ml-2 font-bold cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Stickers */}
      <AnimatePresence>
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, rotate: s.rotate - 20 }}
            animate={{ scale: s.scale, rotate: s.rotate }}
            exit={{ scale: 0, rotate: s.rotate + 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            drag
            dragMomentum={false}
            onDoubleClick={() => removeSticker(s.id)}
            className="sticker-stamp group absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none w-24 sm:w-28 drop-shadow-[2px_5px_8px_rgba(95,30,45,0.18)]"
            style={{
              left: s.x - 56, // Centering offsets (approximate half-width)
              top: s.y - 56, // Centering offsets (approximate half-height)
            }}
            whileHover={{ scale: s.scale * 1.08 }}
            whileDrag={{ scale: s.scale * 1.15, rotate: s.rotate + (Math.random() - 0.5) * 8 }}
          >
            <img src={s.src} alt="" className="w-full h-auto pointer-events-none" />

            {/* Hover Delete Action Cross */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSticker(s.id);
              }}
              className="absolute -top-1 -right-1 bg-[color:var(--rose-deep)] text-[color:var(--cream)] rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow border border-[color:var(--ink)] font-bold no-stamp"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating clear button if any stickers are present */}
      {stickers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-5 z-50 pointer-events-auto"
        >
          <button
            onClick={clearStickers}
            className="hand text-xs bg-[color:var(--rose-deep)] text-[color:var(--cream)] border-2 border-[color:var(--ink)] rounded-full px-3 py-1.5 shadow-[var(--shadow-sticky)] hover:bg-[color:var(--rose)] hover:rotate-[3deg] active:scale-95 transition-all duration-200 cursor-pointer font-bold"
          >
            🧹 clear stickers ({stickers.length})
          </button>
        </motion.div>
      )}
    </div>
  );
}
