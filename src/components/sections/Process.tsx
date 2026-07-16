import { motion } from "framer-motion";

export function Process() {
  return (
    <section id="process" className="relative py-24 px-6 bg-grid">
      <div className="max-w-5xl mx-auto">
        <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">⌇ how a page begins</p>
        <h2 className="font-serif text-5xl md:text-6xl mt-2 mb-3">
          Napkin → <span className="italic">interface.</span>
        </h2>
        <p className="text-[color:var(--ink-soft)] mb-12 max-w-2xl">
          Every screen starts as a rough scribble. Here's the same idea, before and after.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: torn notebook sketch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative paper-card rounded-md p-8 -rotate-2"
            style={{
              background: "var(--paper)",
              clipPath:
                "polygon(0 2%, 6% 0, 18% 3%, 32% 0, 50% 2%, 68% 0, 84% 3%, 100% 0, 100% 96%, 88% 100%, 70% 97%, 52% 100%, 30% 98%, 14% 100%, 0 97%)",
            }}
          >
            <p className="hand text-2xl text-[color:var(--rose-deep)] mb-4">— wireframe, 1:42 am</p>
            <svg
              viewBox="0 0 400 280"
              className="w-full"
              stroke="var(--ink)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <rect x="20" y="20" width="360" height="40" rx="4" strokeDasharray="6 6" />
              <circle cx="40" cy="40" r="8" />
              <line x1="320" y1="40" x2="360" y2="40" />
              <rect x="20" y="80" width="220" height="80" rx="4" />
              <line x1="35" y1="100" x2="180" y2="100" />
              <line x1="35" y1="115" x2="200" y2="115" />
              <line x1="35" y1="130" x2="150" y2="130" />
              <rect x="260" y="80" width="120" height="80" rx="4" strokeDasharray="4 4" />
              <text
                x="290"
                y="125"
                fontFamily="Caveat"
                fontSize="18"
                stroke="none"
                fill="var(--ink-soft)"
              >
                [image]
              </text>
              <rect x="20" y="180" width="100" height="60" rx="6" />
              <rect x="140" y="180" width="100" height="60" rx="6" />
              <rect x="260" y="180" width="120" height="60" rx="6" />
            </svg>
            <p className="hand text-lg text-[color:var(--ink-soft)] mt-3 rotate-1">
              ↑ keep hero left-heavy, breathing room on the right.
            </p>
          </motion.div>

          {/* Right: final UI mock */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative paper-card rounded-2xl p-6 rotate-1 bg-[color:var(--cream)]"
          >
            <span
              className="tape sage"
              style={{ top: -10, left: "40%", transform: "rotate(-2deg)" }}
            />
            <p className="hand text-2xl text-[color:var(--rose-deep)] mb-4">
              — final, after three iterations
            </p>
            <div className="rounded-xl overflow-hidden border border-[color:var(--ink)]/10 bg-[color:var(--paper)]">
              <div className="flex items-center gap-2 px-3 py-2 bg-[color:var(--cream)] border-b border-[color:var(--ink)]/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--rose)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--butter-deep)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--sage)]" />
              </div>
              <div className="p-6">
                <p className="hand text-[color:var(--rose-deep)] text-lg">welcome back ✦</p>
                <p className="font-serif text-2xl text-[color:var(--ink)] mt-1">
                  Today's quiet wins
                </p>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-[color:var(--rose)]/40" />
                  <div className="h-3 w-2/3 rounded bg-[color:var(--butter)]" />
                  <div className="h-3 w-1/2 rounded bg-[color:var(--sage)]/60" />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="h-14 rounded-lg bg-[color:var(--rose)]/35" />
                  <div className="h-14 rounded-lg bg-[color:var(--butter)]" />
                  <div className="h-14 rounded-lg bg-[color:var(--sage)]/45" />
                </div>
              </div>
            </div>
            <p className="hand text-lg text-[color:var(--ink-soft)] mt-3 -rotate-1">
              ↑ same skeleton — softer voice. colour does the talking.
            </p>
          </motion.div>
        </div>

        <p className="hand text-2xl text-center text-[color:var(--ink)] mt-14 -rotate-1">
          interfaces, when they're honest, communicate emotion ✿
        </p>
      </div>
    </section>
  );
}
