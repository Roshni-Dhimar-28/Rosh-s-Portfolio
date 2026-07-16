import { useEffect, useState } from "react";

export function AmbientToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("night", night);
  }, [night]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <button
        onClick={() => setNight((n) => !n)}
        className="hand text-[color:var(--ink)] text-base bg-[color:var(--butter)] border-2 border-[color:var(--ink)] rounded-full px-4 py-2 shadow-[var(--shadow-sticky)] hover:rotate-[-2deg] hover:bg-[color:var(--butter-deep)] active:scale-95 transition-all duration-200 cursor-pointer font-bold"
        aria-label="Toggle late night mode"
      >
        {night ? "☼ daytime" : "☾ late-night"}
      </button>
    </div>
  );
}
