import { motion } from "framer-motion";
import { useRef, useState } from "react";

const notes = [
  { text: "growing the MERN roots", tint: "rose", rot: -4, x: -10, y: 5 },
  { text: "flirting with machine learning", tint: "butter", rot: 3, x: 8, y: -8 },
  { text: "front-end storytelling", tint: "sage", rot: -2, x: -4, y: 10 },
  { text: "placement prep · daily", tint: "peach", rot: 2, x: 12, y: -4 },
  { text: "UI/UX rabbit holes", tint: "rose", rot: 5, x: -6, y: 8 },
  { text: "currently debugging life\nand React components", tint: "butter", rot: -3, x: 5, y: -10 },
  { text: "powered by cold coffee\n+ stubborn determination", tint: "peach", rot: 4, x: -8, y: 6 },
  { text: "favourite coding time:\nrainy evenings", tint: "sage", rot: -2, x: 10, y: -5 },
  { text: "emotionally attached to good UI", tint: "rose", rot: 3, x: -5, y: 8 },
];

const tintMap: Record<string, string> = {
  rose: "var(--rose)",
  butter: "var(--butter)",
  sage: "var(--sage)",
  peach: "var(--peach)",
};

const pinColors: Record<string, string> = {
  rose: "oklch(0.6 0.18 20)", // deep red
  butter: "oklch(0.7 0.16 60)", // amber/orange
  sage: "oklch(0.55 0.14 140)", // deep sage green
  peach: "oklch(0.65 0.17 40)", // warm peach/coral
};

// 3D Push Pin SVG Component
function PushPin({ color }: { color: string }) {
  return (
    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-[1px_3px_2px_rgba(0,0,0,0.3)] rotate-[-8deg] select-none">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Metal Pin Needle */}
        <path d="M12 12v6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M11.5 17.5l.5 2 .5-2z" fill="#64748b" />
        {/* Pin Plastic Cap Shadow and Rim */}
        <circle cx="12" cy="9.5" r="4.5" fill={color} />
        {/* Highlight to create 3D glass shine sphere effect */}
        <circle cx="10.5" cy="8" r="1.2" fill="white" opacity="0.65" />
        {/* Rim grip collar */}
        <path
          d="M7.5 11h9v1.8a0.8 0 01-0.8 0.8h-7.4a0.8 0 01-0.8-0.8v-1.8z"
          fill={color}
          filter="brightness(0.85)"
        />
        {/* Top button rim */}
        <ellipse cx="12" cy="4.5" rx="2.5" ry="1.2" fill={color} filter="brightness(1.15)" />
      </svg>
    </div>
  );
}

export function RightNow() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [zIndices, setZIndices] = useState<number[]>(new Array(notes.length).fill(10));
  const [maxZ, setMaxZ] = useState(11);

  const liftNote = (index: number) => {
    if (zIndices[index] === maxZ) return; // already on top
    const newZ = maxZ + 1;
    setZIndices((prev) => {
      const next = [...prev];
      next[index] = newZ;
      return next;
    });
    setMaxZ(newZ);
  };

  return (
    <section id="now" className="relative py-24 px-6 bg-paper">
      <div className="max-w-6xl mx-auto">
        <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">
          ⌇ pinned to the corkboard
        </p>
        <h2 className="font-serif text-5xl md:text-6xl mt-2 mb-12">
          Right <span className="italic">now.</span>
        </h2>

        <div
          ref={boardRef}
          className="relative rounded-xl p-6 sm:p-10 border-4 border-[color:var(--clay)]/40 overflow-hidden"
          style={{
            background: "color-mix(in oklab, var(--clay) 18%, var(--paper))",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.06), var(--shadow-paper)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {notes.map((n, i) => (
              <motion.div
                key={i}
                drag
                dragConstraints={boardRef}
                dragElastic={0.06}
                dragTransition={{ power: 0.1, timeConstant: 180 }}
                onDragStart={() => liftNote(i)}
                onPointerDown={() => liftNote(i)}
                initial={{ opacity: 0, scale: 0.9, x: n.x, y: n.y }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 90 }}
                whileHover={{ scale: 1.04, zIndex: maxZ + 2, cursor: "grab" }}
                whileDrag={{ scale: 1.08, cursor: "grabbing" }}
                className="sticky-note p-4 sm:p-5 min-h-[7.5rem] flex items-center justify-center text-center text-lg sm:text-xl select-none relative"
                style={{
                  background: tintMap[n.tint],
                  transform: `rotate(${n.rot}deg)`,
                  borderRadius: 3,
                  whiteSpace: "pre-line",
                  zIndex: zIndices[i],
                }}
              >
                {/* 3D push pin replacing the washi tape */}
                <PushPin color={pinColors[n.tint]} />
                {n.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
