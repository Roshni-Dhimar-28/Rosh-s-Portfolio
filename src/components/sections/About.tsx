import { motion } from "framer-motion";
import stickerRosh2 from "@/assets/inspos/sticker rosh 2.png";
import doodleHearts from "@/assets/inspos/doodle with hearts.png";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDoodles";

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-paper overflow-hidden">
      <motion.img
        src={doodleHearts}
        alt=""
        aria-hidden
        drag
        whileHover={{ scale: 1.1, rotate: 12 }}
        whileDrag={{ scale: 1.25, cursor: "grabbing" }}
        className="absolute top-10 right-10 w-24 opacity-80 wiggle cursor-grab select-none z-10"
      />
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1"
        >
          ⌇ a little about me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="font-serif text-5xl md:text-6xl mt-2 mb-10 leading-tight"
        >
          I make things on the internet,
          <br />
          <span className="italic text-[color:var(--rose-deep)]">mostly with care.</span>
        </motion.h2>

        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-5 text-lg leading-relaxed text-[color:var(--ink-soft)] font-serif"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <p>
              I'm Roshh — a MERN stack developer who fell in love with the front of the screen. I
              like the slow part: the spacing, the cursor, the tiny pause before a button does what
              it promised.
            </p>
            <p>
              Most of my code starts on paper. A messy notebook page, a doodle in the margin, a
              half-formed thought at 1 a.m. I think of building as a quiet conversation between the
              screen and the person on the other side of it — and I think good interfaces aren't
              just built.They're felt.
            </p>
            <p>So I build things that feel human on the other side too.</p>
            <p>
              Outside the editor, I practice{" "}
              <span className="relative inline-block font-semibold text-[color:var(--ink)] px-1">
                Bharatanatyam
                <HanddrawnUnderline color="var(--rose-deep)" delay={0.4} />
              </span>{" "}
              — it taught me discipline and rhythm long before{" "}
              <code className="bg-[color:var(--butter)] px-1.5 py-0.5 rounded text-sm">
                npm install
              </code>{" "}
              did. Mostly though, I'm a quiet builder. I read, I refactor, I take long walks through
              unfinished ideas.
            </p>
            <p className="hand text-2xl text-[color:var(--ink)] pt-2">
              — building, gently, into 2026.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="relative w-48 mx-auto md:mx-0"
          >
            <div className="paper-card rounded-md p-3 -rotate-3 hover-lift layered-page">
              <span
                className="tape yellow"
                style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-4deg)" }}
              />
              <img src={stickerRosh2} alt="A sketch of me" className="w-full" />
              <p className="hand text-center text-[color:var(--ink-soft)] mt-1">me, doodled</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
