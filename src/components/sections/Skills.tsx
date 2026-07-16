import { motion } from "framer-motion";
import doodleSparkles from "@/assets/inspos/doodle sparkles.png";
import doodleFlower from "@/assets/inspos/doodle flower.png";

const skills = [
  { name: "React", note: "favourite ♡", color: "rose" as const, rot: -3 },
  { name: "Node.js", note: "the backbone", color: "sage" as const, rot: 2 },
  { name: "MongoDB", note: "collections", color: "butter" as const, rot: -1 },
  { name: "JavaScript", note: "everyday", color: "peach" as const, rot: 3 },
  { name: "Express", note: "tiny + mighty", color: "butter" as const, rot: -2 },
  { name: "Firebase", note: "quick ship", color: "rose" as const, rot: 2 },
  { name: "Git", note: "memory keeper", color: "sage" as const, rot: -3 },
  { name: "Tailwind", note: "speed brush", color: "peach" as const, rot: 1 },
  { name: "Problem solving", note: "puzzle brain", color: "rose" as const, rot: -2 },
  { name: "Adaptability", note: "soft skill ✦", color: "butter" as const, rot: 3 },
];

const colorMap = {
  rose: "var(--rose)",
  sage: "var(--sage)",
  butter: "var(--butter)",
  peach: "var(--peach)",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 bg-grid overflow-hidden">
      {/* Decorative Floating Doodles */}
      <motion.img
        src={doodleSparkles}
        alt=""
        drag
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute top-8 right-8 w-20 opacity-60 float cursor-grab select-none"
      />
      <motion.img
        src={doodleFlower}
        alt=""
        drag
        whileHover={{ scale: 1.1, rotate: -15 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute bottom-6 left-6 w-20 opacity-60 wiggle cursor-grab select-none"
      />

      <div className="max-w-6xl mx-auto">
        <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">
          ⌇ what's in my toolbox
        </p>
        <h2 className="font-serif text-5xl md:text-6xl mt-2 mb-12">
          Sticky notes from <span className="italic">my desk.</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: s.rot }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
              whileHover={{
                y: -10,
                rotate: [-2, 3, -3, 2, 0],
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
              className="sticky-note p-5 h-40 flex flex-col justify-between cursor-pointer"
              style={{ background: colorMap[s.color], borderRadius: 4 }}
            >
              <span
                className="tape"
                style={{ top: -10, left: 14, transform: "rotate(-6deg)", width: 50, height: 16 }}
              />
              <div>
                <p className="font-serif text-xl text-[color:var(--ink)] leading-tight">{s.name}</p>
              </div>
              <p className="text-lg text-[color:var(--ink-soft)]">— {s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
