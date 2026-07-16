import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FrameVideoPlayer } from "@/components/FrameVideoPlayer";
import roshSticker from "@/assets/inspos/rosh_sticker.png";
import doodleStars from "@/assets/inspos/doodle stars.png";
import doodleSparkles from "@/assets/inspos/doodle sparkles.png";
import doodleCoffee from "@/assets/inspos/doodle cold coffee.png";
import pageTexture from "@/assets/inspos/page texture.jpg";




// Helper component for typewriter handwriting animation
function WritingText({ text, delay = 0, speed = 0.02 }: { text: string; delay?: number; speed?: number }) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 1 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: "linear" as const,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline"
    >
      {words.map((word, wordIdx) => {
        const characters = Array.from(word);
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {characters.map((char, charIdx) => (
              <motion.span key={charIdx} variants={childVariants} className="inline">
                {char}
              </motion.span>
            ))}
            {wordIdx < words.length - 1 && <span className="inline">&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}

export function Hero() {
  const [flipped, setFlipped] = useState(false);
  const [time, setTime] = useState("");
  const [timePhrase, setTimePhrase] = useState("");
  const [coffeeStains, setCoffeeStains] = useState<{
    id: number;
    x: number;
    y: number;
    type: "ring" | "splat" | "drip";
    scale: number;
    rotate: number;
  }[]>([]);

  // Mouse tilt effect for Polaroid Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);

  // Live IST Clock (updates every minute for clean cozy journal feel)
  useEffect(() => {
    const updateTime = () => {
      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("en-US", optionsTime).format(now);
      setTime(timeStr.toLowerCase());

      const hour = now.getHours();
      if (hour >= 5 && hour < 12) setTimePhrase("morning logs ☼");
      else if (hour >= 12 && hour < 17) setTimePhrase("afternoon logs ☁");
      else if (hour >= 17 && hour < 21) setTimePhrase("evening reflection ☾");
      else setTimePhrase("midnight logs ☠");
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const addCoffeeStain = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoffeeStains((prev) => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
        type: (["ring", "splat", "drip"] as const)[Math.floor(Math.random() * 3)],
        scale: 0.8 + Math.random() * 0.4,
        rotate: Math.random() * 360,
      },
    ]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 12; // tilt max 12 degrees
    const rotateY = (x / rect.width) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-grid min-h-screen md:h-screen md:min-h-[620px] md:max-h-screen flex items-center px-4 sm:px-6 pt-28 pb-8 select-none"
    >
      {/* Cozy ambient spot lamp glow */}
      <div className="ambient-spotlight" />

      {/* Swaying leaf shadow */}
      <div className="leaf-shadow-overlay">
        <svg viewBox="0 0 800 600" className="w-full h-full opacity-50 fill-current text-[oklch(0.26_0.055_20)]/15" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,0 Q 180,90 320,60 Q 280,180 180,200 Q 100,120 0,0" />
          <path d="M 380,0 Q 520,130 680,90 Q 600,240 450,230 Q 390,140 380,0" />
          <path d="M 680,60 Q 780,220 830,320 Q 700,310 660,190 Q 630,110 680,60" />
          <path d="M 40,360 Q 160,430 200,570 Q 80,540 40,430 Q 10,390 40,360" />
        </svg>
      </div>

      {/* Background drafting lines */}
      <div className="absolute top-24 left-[4%] w-36 h-36 pointer-events-none select-none z-0 hidden lg:block opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[color:var(--ink-soft)] fill-none stroke-[0.8] stroke-linecap-round">
          <circle cx="50" cy="50" r="40" strokeDasharray="3,3" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </svg>
      </div>

      <motion.img
        src={doodleSparkles}
        alt=""
        className="absolute top-24 left-[2%] w-10 opacity-30 pointer-events-none select-none z-10 hidden lg:block"
      />

      <motion.img
        src={doodleStars}
        alt=""
        className="absolute top-20 right-[3%] w-14 opacity-25 pointer-events-none select-none z-10 hidden lg:block"
      />

      {/* Coffee ring stains */}
      {coffeeStains.map((stain) => (
        <div
          key={stain.id}
          className="absolute pointer-events-none z-0 mix-blend-multiply transition-opacity duration-300"
          style={{
            left: stain.x - 32,
            top: stain.y - 32,
            transform: `rotate(${stain.rotate}deg) scale(${stain.scale})`,
            transformOrigin: "center",
          }}
        >
          {stain.type === "ring" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-[0.16] text-[oklch(0.58_0.09_25)]">
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="90,15,40,10" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeDasharray="180,20" />
            </svg>
          )}
          {stain.type === "splat" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-[0.18] text-[oklch(0.58_0.09_25)]">
              <path d="M50,15 Q65,10 65,30 Q70,45 85,50 Q75,65 65,75 Q45,85 30,70 Q15,65 25,45 Q20,25 35,25 Q45,20 50,15 Z" fill="currentColor" />
              <circle cx="82" cy="30" r="2" fill="currentColor" />
              <circle cx="18" cy="68" r="1.5" fill="currentColor" />
            </svg>
          )}
          {stain.type === "drip" && (
            <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-[0.15] text-[oklch(0.58_0.09_25)]">
              <circle cx="50" cy="45" r="30" fill="currentColor" />
              <path d="M47,55 Q50,90 52,90 Q54,90 53,55 Z" fill="currentColor" />
            </svg>
          )}
        </div>
      ))}

      {/* Main Bento Grid Wrapper */}
      <div className="max-w-6xl mx-auto w-full relative z-10 px-2 sm:px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* COLUMN 1 & 2: LEFT COLUMN: Intro Details (spans 2 columns, 2 rows height) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 md:row-span-2 paper-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[color:var(--ink)] shadow-[var(--shadow-paper)] relative overflow-hidden layered-page min-h-[420px] md:h-full"
          >
            {/* Background ruling pattern inside card */}
            <div
              className="absolute inset-0 opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage: `url(${pageTexture})`,
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }}
            />

            <div>
              {/* Greeting */}
              <div className="relative inline-block self-start mb-1">
                <p className="hand text-xl sm:text-2xl lg:text-3xl text-[color:var(--rose-deep)] -rotate-1 relative select-none">
                  hello, i'm
                </p>
                <svg
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-2 w-full h-2 text-[color:var(--rose-deep)]/60 fill-none stroke-current stroke-[3] stroke-linecap-round pointer-events-none select-none"
                >
                  <path d="M 2,5 Q 50,1 98,5" />
                </svg>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-serif font-bold leading-[0.9] text-[color:var(--ink)] tracking-tight mt-1 mb-2.5">
                Roshni Dhimar
                <span className="text-[color:var(--rose-deep)] inline-block w-3.5 h-3.5 rounded-full bg-[color:var(--rose-deep)] ml-1.5 shadow-sm"></span>
              </h1>

              {/* Subheading */}
              <p className="hand text-lg sm:text-xl lg:text-2xl text-[color:var(--ink-soft)] -rotate-[0.5deg] relative inline-block mt-0.5">
                A mern dev & a creative thinker ♡
              </p>

              {/* Dearest Visitor Welcome Letter & Dedication */}
              <div className="hand text-lg sm:text-xl text-[color:var(--ink)] leading-relaxed space-y-2 max-w-xl pt-4 border-t border-[color:var(--ink)]/10 mt-4 select-none relative z-10">
                <p className="text-[color:var(--rose-deep)] font-semibold mb-1">
                  <WritingText text="Dearest visitor," delay={0.8} />
                </p>
                <p className="pl-4 sm:pl-6 leading-relaxed text-base sm:text-lg min-h-[145px]">
                  <WritingText text="This little corner of the internet" delay={1.2} />
                  <br />
                  <WritingText text="is where my ideas," delay={2.0} />
                  <br />
                  <WritingText text="projects," delay={2.5} />
                  <br />
                  <WritingText text="and occasional overthinking" delay={2.8} />
                  <br />
                  <WritingText text="ended up living." delay={3.5} />
                  <br /><br />
                  <WritingText text="i hope you enjoy looking around." delay={4.0} />
                </p>


                <p className="text-right text-2xl sm:text-3xl text-[color:var(--rose-deep)] pr-2 signature select-none mt-1">
                  <WritingText text="- roshhh ♡" delay={4.8} />
                </p>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="mt-5 flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="hover-lift rounded-full px-8 py-4 text-sm font-bold tracking-wider bg-[color:var(--ink)] text-[color:var(--cream)] border-2 border-[color:var(--ink)] hover:bg-transparent hover:text-[color:var(--ink)] transition-all duration-300 shadow-md no-underline uppercase"
              >
                read the journal →
              </a>
              <a
                href="#contact"
                className="hand text-xl text-[color:var(--ink)] relative inline-block group no-underline"
              >
                or say hiee
                <svg
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1.5 w-full h-2 text-[color:var(--rose-deep)]/50 fill-none stroke-current stroke-[3] stroke-linecap-round pointer-events-none select-none group-hover:text-[color:var(--rose-deep)] transition-colors"
                >
                  <path d="M 2,5 C 30,2 60,8 98,4" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 3: RIGHT COLUMN: Top Card: Polaroid Card (spans 1 column, 1 row height) */}
          <motion.div
            variants={cardVariants}
            style={{ perspective: 1000 }}
            className="md:col-span-1 relative flex items-center justify-center min-h-[260px]"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setFlipped(!flipped)}
              animate={{
                rotateX: tilt.x,
                rotateY: flipped ? 180 + tilt.y : 0.5 + tilt.y,
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -12px rgba(95,30,45,0.35)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative w-full h-full min-h-[260px] cursor-pointer shadow-[6px_14px_30px_rgba(95,30,45,0.15)] rounded-2xl border-2 border-[oklch(0.26_0.055_18)] bg-white select-none preserve-3d"
            >
              {/* Front Side */}
              <div
                className="absolute inset-0 p-4 pb-5 flex flex-col justify-between backface-hidden rounded-2xl overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Sheen reflection on hover */}
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-45 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out pointer-events-none z-20" />

                {/* Washi tape */}
                <span
                  className="tape yellow"
                  style={{
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%) rotate(-3deg)",
                    width: 80,
                  }}
                />

                {/* Sunset-glow polaroid photo space */}
                <div className="relative h-[82%] w-full flex items-end justify-center bg-gradient-to-tr from-[oklch(0.9_0.07_80)] to-[oklch(0.95_0.04_90)] rounded-xl overflow-hidden border border-[oklch(0.26_0.055_18)]/15 p-0 shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.03)_90%)] pointer-events-none" />

                  <FrameVideoPlayer />
                </div>

                <p className="font-mono text-center text-[10px] tracking-widest text-[oklch(0.42_0.04_18)] mt-2.5 select-none uppercase">
                  Roshni ✦ Click to flip ⟲
                </p>
              </div>

              {/* Back Side (Journal postcard details) */}
              <div
                className="absolute inset-0 p-4 pb-5 flex flex-col justify-between bg-white rounded-2xl backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundImage: "linear-gradient(to bottom, transparent 24px, rgba(95,30,45,0.08) 25px)",
                  backgroundSize: "100% 25px",
                }}
              >
                {/* Stamp */}
                <div className="absolute top-4 right-4 w-10 h-13 border border-dashed border-red-400 bg-red-50 flex items-center justify-center rotate-[6deg] opacity-80 shadow-sm pointer-events-none select-none">
                  <div className="text-[6px] font-bold text-red-500 font-mono tracking-tighter text-center leading-none">
                    ROSH<br />2026
                  </div>
                </div>

                {/* Postmark circle */}
                <div className="absolute top-7 right-8 w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center rotate-[-15deg] pointer-events-none select-none">
                  <span className="font-mono text-[5px] text-red-500/30 tracking-wider font-bold">VERIFIED</span>
                </div>

                <div>
                  <div className="flex justify-between items-center border-b border-[oklch(0.26_0.055_18)]/15 pb-1.5">
                    <span className="font-bold text-[oklch(0.72_0.075_15)] font-mono text-xs tracking-wider">NOTEBOOK // 2026</span>
                    <span className="text-[9px] text-[oklch(0.42_0.04_18)] opacity-65 font-mono">#ID-01</span>
                  </div>
                  <ul className="space-y-1.5 mt-2.5 leading-normal font-mono text-[10px] text-[oklch(0.26_0.055_18)]">
                    <li className="flex justify-between border-b border-[oklch(0.26_0.055_18)]/5 pb-0.5">
                      <span className="font-bold text-[oklch(0.72_0.075_15)]">AUTHOR:</span>
                      <span>Roshni Dhimar</span>
                    </li>
                    <li className="flex justify-between border-b border-[oklch(0.26_0.055_18)]/5 pb-0.5 gap-2">
                      <span className="font-bold text-[oklch(0.72_0.075_15)] shrink-0">CURRENT CHAPTER:</span>
                      <span className="text-right leading-tight">Building thoughtful web experiences</span>
                    </li>
                    <li className="flex justify-between border-b border-[oklch(0.26_0.055_18)]/5 pb-0.5">
                      <span className="font-bold text-[oklch(0.72_0.075_15)]">HOME BASE:</span>
                      <span>Chennai, India</span>
                    </li>
                    <li className="flex justify-between border-b border-[oklch(0.26_0.055_18)]/5 pb-0.5">
                      <span className="font-bold text-[oklch(0.72_0.075_15)]">POWERED BY:</span>
                      <span>Cold Coffee ☕</span>
                    </li>
                    <li className="flex justify-between pb-0.5 gap-2">
                      <span className="font-bold text-[oklch(0.72_0.075_15)] shrink-0">NEXT GOAL:</span>
                      <span className="text-right leading-tight">A place where I can keep learning.</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center pt-2 border-t border-[oklch(0.26_0.055_18)]/15 text-[10px] text-[oklch(0.42_0.04_18)] opacity-75 font-mono uppercase tracking-wider">
                  "code starts on paper."
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* COLUMN 3: RIGHT COLUMN: Bottom Card: Combined Cozy Notepad Widget (spans 1 column, 1 row height) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 paper-card rounded-2xl border-2 border-[color:var(--ink)] shadow-[var(--shadow-paper)] p-4 select-none relative overflow-hidden layered-page"
          >
            {/* Lined paper texture background */}
            <div
              className="absolute inset-0 opacity-[0.25] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, transparent 27px, rgba(95, 30, 45, 0.08) 28px)
                `,
                backgroundSize: "100% 28px",
              }}
            />

            {/* Notebook Binder Rings along the top edge */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent flex justify-around px-4 pointer-events-none border-b border-[color:var(--ink)]/5 z-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="relative w-3 h-5 flex flex-col items-center">
                  <svg className="absolute -top-2.5 w-2.5 h-6 overflow-visible drop-shadow-[0.5px_1px_1px_rgba(0,0,0,0.2)]" viewBox="0 0 12 28" fill="none">
                    <path d="M 6 0 C 12 4, 12 18, 6 22 C 2 24, 0 18, 0 14" stroke="url(#silver-wire)" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div className="w-2 h-2 rounded-full bg-stone-900/90 absolute top-2 shadow-[inset_0.5px_1px_1px_rgba(0,0,0,0.95)]" />
                </div>
              ))}
            </div>

            {/* Content stack vertically */}
            <div className="relative z-10 pt-2 flex flex-col gap-3">

              {/* Daily Log / Status note */}
              <div className="hand text-[color:var(--ink)] leading-relaxed space-y-1 select-none pt-1.5 pl-1.5">
                <div className="flex justify-between items-center border-b border-[color:var(--ink)]/10 pb-1 mb-2">
                  <span className="text-[color:var(--rose-deep)] text-xs tracking-wider uppercase font-mono font-bold">
                    📌 current logs
                  </span>
                  <span className="text-[9px] font-mono text-[color:var(--ink-soft)] normal-case">
                    {timePhrase} // {time}
                  </span>
                </div>
                <ul className="space-y-2.5 pl-1 text-base sm:text-lg leading-normal mt-2">
                  <li className="flex items-center gap-2">
                    <span>💻</span>
                    <span>building creative web apps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🎨</span>
                    <span>sketching new design ideas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>☕</span>
                    <span>sipping ice cold coffee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📚</span>
                    <span>learning new frontend tools</span>
                  </li>
                </ul>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Pencil overlapping bottom */}
      <div className="absolute left-[38%] bottom-6 z-20 hidden md:block">
        <motion.div
          drag
          dragConstraints={sectionRef}
          dragElastic={0.2}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, zIndex: 50 }}
          className="cursor-grab active:cursor-grabbing select-none rotate-[-6deg] w-36"
        >
          <svg viewBox="0 0 150 20" className="w-full h-full drop-shadow-md">
            <path d="M 0,6 Q 0,14 4,14 L 10,14 L 10,6 L 4,6 Z" fill="#f43f5e" />
            <rect x="10" y="6" width="8" height="8" fill="#94a3b8" />
            <line x1="14" y1="6" x2="14" y2="14" stroke="#475569" strokeWidth="0.8" />
            <rect x="18" y="6" width="100" height="8" fill="#eab308" />
            <rect x="18" y="6" width="100" height="2" fill="#facc15" />
            <rect x="18" y="12" width="100" height="2" fill="#ca8a04" />
            <polygon points="118,6 138,10 118,14" fill="#fed7aa" />
            <polygon points="130,8.5 138,10 130,11.5" fill="#1e293b" />
            <text x="50" y="11.5" fontFamily="var(--font-sans)" fontSize="5.5" fill="#ca8a04" opacity="0.8" fontWeight="bold">
              ROSHNI · HB
            </text>
          </svg>
        </motion.div>
      </div>

      {/* Decorative coffee mug overlapping bottom right */}
      <div className="absolute right-[8%] bottom-6 z-20 hidden md:block">
        <motion.div
          drag
          dragConstraints={sectionRef}
          dragElastic={0.15}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileDrag={{ scale: 1.15, zIndex: 50 }}
          onDragEnd={(e: any) => {
            if (sectionRef.current) {
              const rect = sectionRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                setCoffeeStains((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    x,
                    y,
                    type: (["ring", "splat", "drip"] as const)[Math.floor(Math.random() * 3)],
                    scale: 0.8 + Math.random() * 0.4,
                    rotate: Math.random() * 360,
                  },
                ]);
              }
            }
          }}
          className="cursor-grab active:cursor-grabbing w-12 select-none"
        >
          <img
            src={doodleCoffee}
            alt="Cold coffee cup doodle"
            className="w-full h-auto drop-shadow-md pointer-events-none"
          />
        </motion.div>
      </div>



      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hand text-[color:var(--ink-soft)] text-sm z-10 select-none animate-pulse">
        scroll, slowly ↓
      </div>
    </section>
  );
}
