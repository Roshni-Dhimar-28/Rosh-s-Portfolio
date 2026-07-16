const notes = [
  {
    text: "Rosh sees the small things in a UI nobody else does. Working with her is like having a designer and a developer in one head.",
    who: "— a classmate, on a group project",
    tint: "butter",
    rot: -3,
  },
  {
    text: "She asks ‘but how will it feel?’ before ‘how will it work?’ That changed how our whole team built.",
    who: "— a collaborator",
    tint: "rose",
    rot: 2,
  },
  {
    text: "Quietly one of the most thoughtful builders I've mentored this year. Reads briefs like poetry.",
    who: "— a mentor",
    tint: "sage",
    rot: -2,
  },
];

const tint: Record<string, string> = {
  butter: "var(--butter)",
  rose: "var(--rose)",
  sage: "var(--sage)",
};

export function Voices() {
  return (
    <section id="voices" className="relative py-24 px-6 bg-paper">
      <div className="max-w-5xl mx-auto">
        <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">
          ⌇ a voice from the journey
        </p>
        <h2 className="font-serif text-5xl md:text-6xl mt-2 mb-12">
          Notes left by <span className="italic">other hands.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {notes.map((n, i) => (
            <div
              key={i}
              className="sticky-note p-6 hover-lift relative"
              style={{
                background: tint[n.tint],
                transform: `rotate(${n.rot}deg)`,
                borderRadius: 3,
              }}
            >
              <span
                className="tape"
                style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-3deg)" }}
              />
              <p className="text-xl sm:text-2xl leading-snug text-[color:var(--ink)]">“{n.text}”</p>
              <p className="text-base text-[color:var(--ink-soft)] mt-5">{n.who}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
