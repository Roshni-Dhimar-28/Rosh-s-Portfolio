import { motion } from "framer-motion";
import coffee from "@/assets/inspos/doodle cold coffee.png";
import doodleCat from "@/assets/inspos/sticker cat 3.png";
import doodleFlower from "@/assets/inspos/doodle flower.png";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDoodles";

const things = [
  { label: "dance", text: "Bharatanatyam — the practice of staying in your own rhythm." },
  { label: "books", text: "Slow fiction, soft non-fiction, anything that smells like rain." },
  {
    label: "weather",
    text: "Rainy evenings. The kind that makes the world quiet enough to think.",
  },
  { label: "drink", text: "Cold coffee, almost always. A small ritual on bad code days." },
  { label: "company", text: "My own — and a notebook that doesn't argue back." },
];

export function BeyondCode() {
  return (
    <section id="beyond" className="relative py-24 px-6 bg-grid overflow-hidden">
      <motion.img
        src={coffee}
        alt=""
        aria-hidden
        drag
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileDrag={{ scale: 1.25, cursor: "grabbing" }}
        className="absolute -top-4 right-8 w-28 sm:w-36 -rotate-12 float cursor-grab select-none z-10"
      />
      <motion.img
        src={doodleFlower}
        alt=""
        aria-hidden
        drag
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileDrag={{ scale: 1.25, cursor: "grabbing" }}
        className="absolute bottom-10 left-4 w-20 opacity-80 wiggle cursor-grab select-none z-10"
      />

      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1"
        >
          ⌇ beyond the code
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif text-5xl md:text-6xl mt-2 mb-3"
        >
          The other tabs I keep{" "}
          <span className="relative inline-block">
            <span className="relative z-10 italic">open.</span>
            <HanddrawnUnderline color="var(--rose-deep)" delay={0.4} />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[color:var(--ink-soft)] mb-12 max-w-2xl"
        >
          No metaphors. Just the things that make the rest of me.
        </motion.p>

        <ul className="space-y-6">
          {things.map((t, idx) => (
            <motion.li
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
              className="paper-card rounded-md p-5 sm:p-7 hover-lift layered-page flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-baseline"
            >
              <span className="hand text-3xl text-[color:var(--rose-deep)] min-w-[6rem] -rotate-2">
                {t.label}
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[color:var(--ink)] leading-snug">
                {t.text}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 relative max-w-xs"
        >
          <motion.img
            src={doodleCat}
            alt=""
            aria-hidden
            whileHover={{
              rotate: [-6, 6, -6],
              scale: 1.1,
              transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
            }}
            className="w-32 -rotate-6 cursor-pointer select-none origin-bottom"
          />
          <p className="hand text-xl text-[color:var(--ink-soft)] -rotate-2 mt-2">
            — and a cat, somewhere nearby.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
