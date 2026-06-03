export function BrandHeader() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
        <div className="relative group">
          <div className="absolute inset-0 bg-[var(--cyan-glow)] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
          <img
            src="/visionary-ventures.png"
            alt="Visionary Ventures"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_16px_oklch(0.65_0.18_220/0.4)]"
          />
        </div>
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--cyan-glow)]/40 to-transparent" />
        <div className="relative group">
          <img
            src="/nuaiy-logo.png"
            alt="Nuaiy"
            className="h-14 sm:h-16 w-auto object-contain rounded-lg drop-shadow-[0_0_16px_oklch(0.65_0.18_220/0.5)]"
          />
        </div>
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-[var(--gold-metallic)]/40 to-transparent" />
        <div className="relative group">
          <img
            src="/keltix-logo.png"
            alt="Keltix"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_16px_oklch(0.82_0.14_85/0.4)]"
          />
        </div>
      </div>
    </div>
  );
}
