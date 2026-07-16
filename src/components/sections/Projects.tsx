import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import doodleStars from "@/assets/inspos/doodle stars.png";
import doodleSparkles from "@/assets/inspos/doodle sparkles.png";
import stickerPaws from "@/assets/inspos/sticker paws.png";
import doodleFlower from "@/assets/inspos/doodle flower.png";

// Import screenshots statically for bundling
import score1 from "@/assets/projects/SCORE 1.png";
import score2 from "@/assets/projects/SCORE 2.png";
import score3 from "@/assets/projects/SCORE 3.png";
import score4 from "@/assets/projects/SCORE 4.png";
import score5 from "@/assets/projects/SCORE 5.png";
import score6 from "@/assets/projects/SCORE 6.png";
import score7 from "@/assets/projects/SCORE 7.png";
import score8 from "@/assets/projects/SCORE 8.png";
import score9 from "@/assets/projects/SCORE 9.png";
import score10 from "@/assets/projects/SCORE 10.png";

import lms1 from "@/assets/projects/LMS 1.png";
import lms2 from "@/assets/projects/LMS 2.png";
import lms4 from "@/assets/projects/LMS 4.png";
import lms5 from "@/assets/projects/LMS 5.png";
import lms6 from "@/assets/projects/LMS 6.png";
import lms7 from "@/assets/projects/LMS 7.png";
import lms8 from "@/assets/projects/LMS 8.png";
import lms10 from "@/assets/projects/LMS 10.png";
import lms11 from "@/assets/projects/LMS 11.png";
import lms12 from "@/assets/projects/LMS 12.png";

import stranger1 from "@/assets/projects/STRANGER 1.png";
import stranger2 from "@/assets/projects/STRANGER 2.png";
import stranger3 from "@/assets/projects/STRANGER 3.png";
import stranger4 from "@/assets/projects/STRANGER 4.png";
import stranger5 from "@/assets/projects/STRANGER 5.png";
import stranger6 from "@/assets/projects/STRANGER 6.png";
import stranger7 from "@/assets/projects/STRANGER 7.png";
import stranger8 from "@/assets/projects/STRANGER 8.png";

import apna1 from "@/assets/projects/apna1.png";
import apna2 from "@/assets/projects/apna2.png";
import apna3 from "@/assets/projects/apna3.png";
import apna4 from "@/assets/projects/apna4.png";
import apna5 from "@/assets/projects/apna5.png";
import apna6 from "@/assets/projects/apna6.png";
import apna7 from "@/assets/projects/apna7.png";
import apna9 from "@/assets/projects/apna9.png";
import apna10 from "@/assets/projects/apna10.png";
import apna11 from "@/assets/projects/apna11.png";
import apna12 from "@/assets/projects/apna12.png";

type Project = {
  title: string;
  kind: string;
  problem: string;
  approach: string;
  stack: string[];
  challenge: string;
  learned: string;
  different: string;
  tint: string;
  github: string;
  demo?: string;
  images: string[];
};

const projects: Project[] = [
  {
    title: "Score",
    kind: "a skill-based freelancing corner for student creators · group project",
    problem:
      "Standard freelancing sites are crowded with experience requirements, leaving no space for skilled students to find projects.",
    approach:
      "We built Score as a digital campus commons. Using React, Express, and Firebase, we designed simple portals for students, alumni, and recruiters.",
    stack: ["React", "Express", "Node.js", "Firebase", "Tailwind CSS"],
    challenge:
      "Mapping roles and projects in Firebase cleanly without over-complicating the authentication flow.",
    learned:
      "We learned that role-based screens need to load instantly and adapt without jarring layout flashes.",
    different:
      "We would replace the bidding system with a direct 'handshake' introduction to make matches feel less transactional.",
    tint: "rose",
    github: "https://github.com/Roshni-Dhimar-28/Score",
    images: [score1, score2, score3, score4, score5, score6, score7, score8, score9, score10],
  },
  {
    title: "Apna Mart",
    kind: "a role-based retail operating system for modern supermarkets",
    problem:
      "Traditional billing software only handles transactions, leaving inventory, staffing, and operations scattered across disconnected, repetitive tools.",
    approach:
      "We built a role-based retail OS with dedicated workspaces for Counter (Cashier), Store (Manager), and Control (Owner) to clean up workflows.",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "Tailwind CSS",
      "Barcode Scanner Integration",
    ],
    challenge:
      "Keeping checkout lightning-fast while structuring complex role-based routing, permissions, barcode scanning and live inventory sync.",
    learned:
      "Enterprise tools succeed when they fit daily routines. Designing around specific roles kept the interface clean and fast.",
    different:
      "Add offline-first sync for network drops, multi-branch support, and AI forecasting for smart inventory restocking.",
    tint: "peach",
    github: "https://github.com/Roshni-Dhimar-28/Apna-Mart",
    images: [
      apna1,
      apna2,
      apna3,
      apna4,
      apna5,
      apna6,
      apna7,
      apna9,
      apna10,
      apna11,
      apna12,
    ],
  },
  {
    title: "The Strangers",
    kind: "a digital brochure for a Rotaract cultural event · group project",
    problem:
      "Our local Rotaract Club needed an online brochure to share rules, schedules, and event details. It had to be lightweight and load quickly for students using mobile data.",
    approach:
      "We built a responsive, single-page React brochure. We kept the bundle small and used native CSS layouts so that the event details loaded instantly on any phone.",
    stack: ["HTML", "CSS", "JavaScript", "React"],
    challenge:
      "Making the dense rulebook and multi-day schedule look clean and readable on small screens.",
    learned:
      "Working together on this taught us that presenting complex information simply is its own art. A clean, minimal layout is much more useful than a heavy, overdesigned page.",
    different:
      "We would add an offline-first caching system so that participants could check the rules and schedule inside the venue even without active internet.",
    tint: "sage",
    github: "https://github.com/Roshni-Dhimar-28/Strangers_Culturals",
    demo: "https://strangers-testing.netlify.app/",
    images: [stranger1, stranger2, stranger3, stranger4, stranger5, stranger6, stranger7, stranger8],
  },
  {
    title: "LMS Platform",
    kind: "a quiet classroom on the internet",
    problem:
      "Learning portals often feel like locked databases. We wanted a simple, course-taking space students would actually open on a Sunday.",
    approach:
      "Created a minimal MERN stack portal with course curation, enrollment, and progress-tracking. Tested APIs with Postman.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "Postman"],
    challenge:
      "Keeping student progress synchronized across schemas without lag or database stutter.",
    learned:
      "Manual Postman tests helped us simulate slow connections and catch UI bugs before launch.",
    different:
      "Add offline caching for lecture notes so studying doesn't break when connection drops.",
    tint: "butter",
    github: "https://github.com/Roshni-Dhimar-28/LMS---Learning-hub",
    //demo: "",
    images: [lms1, lms2, lms4, lms5, lms6, lms7, lms8, lms10, lms11, lms12],
  },
];

const tintMap: Record<string, string> = {
  rose: "var(--rose)",
  butter: "var(--butter)",
  sage: "var(--sage)",
  peach: "var(--peach)",
};

const pageVariants = {
  initial: (dir: number) => ({
    rotateY: dir > 0 ? 80 : -80,
    skewY: dir > 0 ? -3 : 3,
    scale: 0.98,
    opacity: 0,
    transformOrigin: "left center",
  }),
  animate: {
    rotateY: 0,
    skewY: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -80 : 80,
    skewY: dir > 0 ? 3 : -3,
    scale: 0.98,
    opacity: 0,
    transformOrigin: "left center",
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  }),
};

export function Projects() {
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage > activePage) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setActivePage(newPage);
  };

  const p = projects[activePage];

  // Reset image index when switching between projects
  useEffect(() => {
    setActiveImgIndex(0);
  }, [activePage]); return (
    <section id="projects" className="relative py-12 md:py-16 px-4 md:px-6 bg-grid overflow-hidden md:h-screen md:min-h-[640px] md:max-h-[850px] flex items-center">
      {/* Decorative Floating Doodles */}
      <motion.img
        src={doodleStars}
        alt=""
        drag
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute top-10 left-6 w-20 opacity-60 float cursor-grab select-none z-10"
      />
      <motion.img
        src={doodleFlower}
        alt=""
        drag
        whileHover={{ scale: 1.1, rotate: -15 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute right-4 top-1/3 w-24 opacity-60 wiggle cursor-grab select-none z-10"
      />
      <motion.img
        src={stickerPaws}
        alt=""
        drag
        whileHover={{ scale: 1.1, rotate: 25 }}
        whileDrag={{ scale: 1.25, cursor: "grabbing" }}
        className="absolute left-6 bottom-16 w-14 rotate-12 opacity-60 cursor-grab select-none z-10"
      />

      <div className="max-w-5xl mx-auto relative w-full">
        <div className="relative">
          <p className="hand text-2xl text-[color:var(--rose-deep)] -rotate-1">
            ⌇ from the project notebook
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mt-1 mb-2">
            Four pages I'm <span className="italic">proud to share.</span>
          </h2>
          <img
            src={doodleSparkles}
            alt=""
            className="absolute -top-6 right-6 w-16 opacity-75 wiggle pointer-events-none"
          />
        </div>
        <p className="text-[color:var(--ink-soft)] max-w-2xl mb-8 text-sm">
          Not just screenshots — the messy middle too. The problem, the wobble, the lesson.
        </p>

        {/* 3D Notebook Page container */}
        <div className="relative max-w-4xl mx-auto mt-8" style={{ perspective: 1500 }}>
          {/* Index Tabs (Divider tabs sticking out from notebook) */}
          {/* Desktop tabs on the right */}
          <div className="hidden md:flex absolute right-[-80px] top-12 flex-col gap-3 z-40">
            {projects.map((proj, idx) => (
              <button
                key={proj.title}
                onClick={() => handlePageChange(idx)}
                className={`hand text-sm py-2 rounded-r-lg border-2 border-l-0 border-[color:var(--ink)] shadow-md transition-all duration-200 cursor-pointer w-24 ${activePage === idx
                    ? "bg-[color:var(--rose)] text-[color:var(--ink)] font-bold translate-x-1"
                    : "bg-[color:var(--paper)] text-[color:var(--ink-soft)] hover:bg-[color:var(--butter)]"
                  }`}
              >
                Page 0{idx + 1}
              </button>
            ))}
          </div>

          {/* Mobile tabs on top */}
          <div className="flex md:hidden absolute top-[-36px] left-4 right-4 flex-row justify-center gap-2 z-40">
            {projects.map((proj, idx) => (
              <button
                key={proj.title}
                onClick={() => handlePageChange(idx)}
                className={`hand text-xs px-3 py-1.5 rounded-t-lg border-2 border-b-0 border-[color:var(--ink)] shadow-sm transition-all duration-200 cursor-pointer ${activePage === idx
                    ? "bg-[color:var(--rose)] text-[color:var(--ink)] font-bold translate-y-0.5"
                    : "bg-[color:var(--paper)] text-[color:var(--ink-soft)] hover:bg-[color:var(--butter)]"
                  }`}
              >
                Page 0{idx + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={activePage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                transformStyle: "preserve-3d",
                background: `color-mix(in oklab, ${tintMap[p.tint]} 20%, var(--paper))`,
              }}
              className="relative paper-card folded rounded-lg p-5 pl-10 pr-5 sm:p-8 sm:pl-16 min-h-[460px] bg-lines border-2 border-[color:var(--ink)] shadow-[var(--shadow-paper)] before:content-[''] before:absolute before:left-7 sm:before:left-12 before:top-0 before:bottom-0 before:w-[2px] before:bg-rose-400/40 overflow-visible flex flex-col justify-between"
            >
              {/* Dynamic Flip Light Sweep Shadow overlay */}
              <motion.div
                key={`sweep-${activePage}`}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-black/5 via-black/0 to-black/15 pointer-events-none rounded-lg z-20"
              />
              {/* Washi tapes on page corners */}
              <span
                className="tape"
                style={{ top: -12, left: "10%", transform: "rotate(-4deg)" }}
              />
              <span
                className="tape yellow"
                style={{ top: -10, right: "12%", transform: "rotate(5deg)" }}
              />

              {/* Spiral Binding Loop Rings on Left Edge */}
              <div className="absolute left-[-10px] top-6 bottom-6 flex flex-col justify-between w-5 pointer-events-none z-30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex items-center h-4">
                    {/* Metal ring loop */}
                    <div className="w-5 h-2.5 rounded-full bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 border border-neutral-600/30 shadow-[1px_1px_3px_rgba(0,0,0,0.15)]" />
                  </div>
                ))}
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-1 pl-2 sm:pl-4">
                  <h3 className="font-serif text-2xl sm:text-4xl">{p.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hand text-base text-[color:var(--ink)] transition-all duration-200 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border-2 border-[color:var(--ink)] shadow-[2px_2px_0px_var(--ink)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] select-none cursor-pointer"
                      style={{
                        backgroundColor: tintMap[p.tint],
                      }}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                      <span className="font-bold lowercase text-xs sm:text-sm">code ↗</span>
                    </a>
                    {p.demo !== undefined && (
                      <a
                        href={p.demo || "#"}
                        target={p.demo ? "_blank" : undefined}
                        rel={p.demo ? "noopener noreferrer" : undefined}
                        className="hand text-base text-[color:var(--ink)] transition-all duration-200 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border-2 border-[color:var(--ink)] shadow-[2px_2px_0px_var(--ink)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] select-none cursor-pointer"
                        style={{
                          backgroundColor: "var(--cream)",
                        }}
                      >
                        <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span className="font-bold lowercase text-xs sm:text-sm">demo ↗</span>
                      </a>
                    )}
                    <span className="hand text-lg text-[color:var(--ink-soft)] -rotate-1">
                      № 0{activePage + 1}
                    </span>
                  </div>
                </div>
                <p className="hand text-lg sm:text-xl text-[color:var(--rose-deep)] mb-4 -rotate-1 pl-2 sm:pl-4 pr-6 md:pr-[260px] leading-snug">
                  — {p.kind}
                </p>

                {/* 2-column Grid Body inside notebook */}
                <div className="grid md:grid-cols-12 gap-6 pl-2 sm:pl-4 overflow-visible">
                  {/* Left Side: Project details text and sticky note bottom row (8 cols) */}
                  <div className="md:col-span-8 flex flex-col justify-between min-h-[220px] gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-[color:var(--ink)]">
                      <Field label="the problem" body={p.problem} />
                      <Field label="my approach" body={p.approach} />
                      <Field label="the challenge" body={p.challenge} />
                      <Field label="what we learned" body={p.learned} />
                    </div>

                    {/* Bottom row: Tech tags on left, sticky note on right */}
                    <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mt-2">
                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 max-w-xs md:max-w-sm">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded-full border border-[color:var(--ink)]/20 bg-[color:var(--cream)]/60 text-[color:var(--ink-soft)] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* What I'd do differently — folded sticky note relocated here for space */}
                      <div className="relative w-full sm:w-[220px] shrink-0 z-10">
                        <div
                          className="sticky-note p-3 pt-4 rotate-[1.5deg] shadow-[var(--shadow-sticky)] text-xs"
                          style={{ background: "var(--butter)", borderRadius: 2 }}
                        >
                          <span
                            className="tape"
                            style={{ top: -8, left: 16, transform: "rotate(-8deg)", width: 50, height: 16 }}
                          />
                          <p className="hand text-[color:var(--rose-deep)] text-xs mb-0.5 font-bold">
                            what we'd do differently:
                          </p>
                          <p className="hand text-xs sm:text-sm text-[color:var(--ink)] leading-tight">
                            {p.different}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Interactive Gallery ONLY (4 cols) */}
                  <div className="md:col-span-4 flex flex-col justify-start relative min-h-[220px]">
                    {/* Polaroid gallery */}
                    {p.images.length > 0 ? (
                      <div className="relative group/gallery">
                        {/* Washi tape pinning the polaroid */}
                        <span
                          className="tape yellow z-35"
                          style={{ top: -14, left: "30%", transform: "rotate(-6deg)", width: 65, height: 18 }}
                        />
                        {/* Polaroid frame */}
                        <div
                          onClick={() => setLightboxOpen(true)}
                          className="bg-white p-2 pb-4 border border-neutral-300 shadow-[var(--shadow-sticky)] rounded-sm rotate-[-1deg] transition-all duration-300 hover:rotate-0 hover:scale-[1.01] cursor-zoom-in relative z-20"
                        >
                          {/* Polaroid photo display area */}
                          <div className="relative bg-stone-100 aspect-[4/3] w-full overflow-hidden border border-neutral-200/50 shadow-inner flex items-center justify-center">
                            <img
                              src={p.images[activeImgIndex]}
                              alt={`${p.title} screenshot ${activeImgIndex + 1}`}
                              className="w-full h-full object-cover select-none pointer-events-none"
                            />
                            {/* Gallery Navigation Controls Overlaid */}
                            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-200 z-30">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImgIndex((prev) => (prev === 0 ? p.images.length - 1 : prev - 1));
                                }}
                                className="w-6 h-6 rounded-full bg-white/95 hover:bg-white text-[color:var(--ink)] shadow flex items-center justify-center font-bold text-xs cursor-pointer border border-neutral-200"
                              >
                                ←
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImgIndex((prev) => (prev === p.images.length - 1 ? 0 : prev + 1));
                                }}
                                className="w-6 h-6 rounded-full bg-white/95 hover:bg-white text-[color:var(--ink)] shadow flex items-center justify-center font-bold text-xs cursor-pointer border border-neutral-200"
                              >
                                →
                              </button>
                            </div>

                            {/* Dots navigation overlaid at the bottom */}
                            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1 z-30 bg-black/30 py-0.5 px-2 rounded-full max-w-[100px] mx-auto">
                              {p.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImgIndex(idx);
                                  }}
                                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${activeImgIndex === idx ? "bg-white scale-125" : "bg-white/40"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          {/* Polaroid caption area */}
                          <div className="mt-1.5 text-center">
                            <span className="hand text-[10px] font-bold text-[color:var(--ink-soft)] select-none">
                              screenshot {activeImgIndex + 1} of {p.images.length} 🔍
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Apna Mart handwritten sketch/placeholder */
                      <div className="relative">
                        <span
                          className="tape yellow z-35"
                          style={{ top: -14, left: "30%", transform: "rotate(3deg)", width: 65, height: 18 }}
                        />
                        <div className="bg-white p-3 pb-4 border border-neutral-300 shadow-[var(--shadow-sticky)] rounded-sm rotate-[1.5deg] bg-lines min-h-[150px] flex flex-col justify-between items-center text-center relative z-20">
                          <div className="my-auto">
                            <p className="hand text-sm text-[color:var(--rose-deep)] font-bold mb-0.5">
                              🎨 visual diary in progress
                            </p>
                            <p className="hand text-[color:var(--ink-soft)] text-[11px] px-2 leading-snug">
                              doodling interface blueprints. screenshots coming soon!
                            </p>
                          </div>
                          {/* Little shop icon sketch */}
                          <div className="w-7 h-7 border border-dashed border-[color:var(--ink)]/40 rounded flex items-center justify-center opacity-60 mt-1">
                            <svg className="w-3.5 h-3.5 text-[color:var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Page Navigation Corner Controls */}
              <div className="mt-4 pt-3 border-t border-[color:var(--ink)]/10 flex justify-between items-center text-sm pl-2 sm:pl-4">
                <button
                  disabled={activePage === 0}
                  onClick={() => handlePageChange(activePage - 1)}
                  className="hand text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1 font-bold"
                >
                  ← prev page
                </button>
                <span className="hand text-sm text-[color:var(--ink-soft)] font-bold">
                  page {activePage + 1} of {projects.length}
                </span>
                <button
                  disabled={activePage === projects.length - 1}
                  onClick={() => handlePageChange(activePage + 1)}
                  className="hand text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center gap-1 font-bold"
                >
                  next page →
                </button>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox / Zoom-in Modal Overlay */}
      <AnimatePresence>
        {lightboxOpen && p.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/90 z-[200] flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Lightbox header/close */}
            <div className="absolute top-4 right-4 text-white text-4xl font-light cursor-pointer select-none">
              &times;
            </div>

            {/* Lightbox image and buttons wrapper */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Next/Prev buttons in Lightbox */}
              <button
                onClick={() => setActiveImgIndex((prev) => (prev === 0 ? p.images.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-4 z-[210] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xl flex items-center justify-center border border-white/15 cursor-pointer shadow-lg"
              >
                ←
              </button>

              <img
                src={p.images[activeImgIndex]}
                alt={`${p.title} full screenshot`}
                className="max-w-[90%] max-h-[75vh] object-contain rounded border border-white/10 shadow-2xl"
              />

              <button
                onClick={() => setActiveImgIndex((prev) => (prev === p.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 sm:right-4 z-[210] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xl flex items-center justify-center border border-white/15 cursor-pointer shadow-lg"
              >
                →
              </button>
            </div>

            {/* Lightbox caption */}
            <div className="mt-4 text-white/70 font-sans text-sm select-none">
              {p.title} — screenshot {activeImgIndex + 1} of {p.images.length} (click anywhere to close)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="hand text-lg text-[color:var(--rose-deep)] mb-0.5 font-bold">{label}</p>
      <p className="leading-relaxed text-[color:var(--ink-soft)] text-xs sm:text-sm">{body}</p>
    </div>
  );
}
