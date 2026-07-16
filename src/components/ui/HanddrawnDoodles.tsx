import { motion } from "framer-motion";

interface DoodleProps {
  className?: string;
  color?: string;
  delay?: number;
  duration?: number;
}

export function HanddrawnUnderline({
  className = "",
  color = "var(--rose-deep)",
  delay = 0.4,
  duration = 0.8,
}: DoodleProps) {
  return (
    <svg
      className={`absolute left-0 bottom-[-4px] w-full h-[10px] overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 2,6 C 20,4 40,8 60,5 C 75,3 88,7 98,4"
        fill="transparent"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function HanddrawnCircle({
  className = "",
  color = "var(--rose-deep)",
  delay = 0.5,
  duration = 1.0,
}: DoodleProps) {
  return (
    <svg
      className={`absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 50,5 C 22,5 5,22 5,50 C 5,78 22,95 50,95 C 78,95 95,78 95,50 C 95,25 78,6 52,8 C 45,9 38,12 36,15"
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay, duration, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function HanddrawnDoubleUnderline({
  className = "",
  color = "var(--rose-deep)",
  delay = 0.3,
}: DoodleProps) {
  return (
    <svg
      className={`absolute left-0 bottom-[-6px] w-full h-[12px] overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 1,4 C 25,6 50,2 75,5 C 85,6 93,3 99,4"
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.7, ease: "easeOut" }}
      />
      <motion.path
        d="M 4,8 C 30,10 58,7 82,9 C 89,9 94,8 97,7"
        fill="transparent"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

export function HanddrawnArrow({
  className = "",
  color = "var(--rose-deep)",
  delay = 0.5,
}: DoodleProps) {
  return (
    <svg
      className={`w-16 h-16 overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 50 50"
      fill="none"
    >
      {/* Arrow shaft */}
      <motion.path
        d="M 5,5 Q 15,35 40,40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
      />
      {/* Arrow barb 1 */}
      <motion.path
        d="M 28,34 Q 38,39 40,40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5, duration: 0.3, ease: "easeOut" }}
      />
      {/* Arrow barb 2 */}
      <motion.path
        d="M 35,28 Q 39,38 40,40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.6, duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}
