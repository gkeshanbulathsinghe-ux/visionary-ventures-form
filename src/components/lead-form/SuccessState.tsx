import { motion } from "framer-motion";
import aiMentor from "@/assets/ai-mentor.asset.json";

export function SuccessState({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative glass-panel glow-border rounded-3xl p-10 sm:p-14 text-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--cyan-glow)]/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--cyan-glow)]/30 blur-2xl animate-pulse-glow" />
          <svg
            viewBox="0 0 100 100"
            className="relative w-24 h-24"
            fill="none"
            stroke="url(#successGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="successGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="oklch(0.82 0.18 215)" />
                <stop offset="1" stopColor="oklch(0.82 0.14 85)" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="50" cy="50" r="44"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M30 52 L45 67 L72 38"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cyan">
            Welcome aboard, {name.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your spot in the <span className="text-[var(--gold-metallic)] font-semibold">Visionary Ventures AI Path</span> is reserved.
            Our team will reach out on WhatsApp shortly.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-[var(--cyan-glow)]/30">
          <img src={aiMentor.url} alt="Nuaiy Mentor" className="w-10 h-10 rounded-full object-cover" />
          <p className="text-sm text-foreground/90">
            <span className="text-[var(--cyan-glow)] font-semibold">Nuaiy</span> is warming up your 24/7 mentor session…
          </p>
        </div>
      </div>
    </motion.div>
  );
}