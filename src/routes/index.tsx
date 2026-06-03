import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import aiMentor from "@/assets/ai-mentor.asset.json";
import { BrandHeader } from "@/components/lead-form/BrandHeader";
import { LeadForm } from "@/components/lead-form/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Mastery & Automation | Visionary Ventures" },
      { name: "description", content: "Master AI automation, digital marketing, and content creation with Visionary Ventures. Apply now and let Nuaiy, your 24/7 AI Mentor, guide your journey." },
      { property: "og:title", content: "AI Mastery & Automation | Visionary Ventures" },
      { property: "og:description", content: "Master AI automation, digital marketing, and content creation with Visionary Ventures. Apply now and let Nuaiy, your 24/7 AI Mentor, guide your journey." },
      { property: "og:url", content: "https://joinvisionaryventurescom.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://joinvisionaryventurescom.lovable.app/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[oklch(0.65_0.20_245/0.18)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[oklch(0.82_0.14_85/0.10)] blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[var(--cyan-glow)] animate-pulse-glow" />

      <Toaster theme="dark" position="top-center" richColors />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
        <BrandHeader />

        <div className="mt-10 sm:mt-14 text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold border border-[var(--cyan-glow)]/30 bg-[var(--cyan-glow)]/5 text-[var(--cyan-glow)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan-glow)] animate-pulse" />
            A new era of learning
          </span>
          <h1 className="font-[Outfit] text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Join the{" "}
            <span className="text-gradient-cyan">AI Learning Paths</span>
            <br />
            built for the next generation.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Four mastery tracks. One <span className="text-gradient-gold font-semibold">24/7 AI mentor</span>.
            Reserve your seat and let Nuaiy guide your journey from beginner to builder.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-start">
          {/* AI Mentor side panel */}
          <aside className="relative lg:sticky lg:top-10 hidden lg:block">
            <div className="relative glass-panel glow-border rounded-3xl p-2 overflow-hidden">
              <div className="relative rounded-[1.4rem] overflow-hidden">
                <img
                  src={aiMentor.url}
                  alt="Nuaiy — A mentor that never sleeps"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--cyan-glow)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan-glow)] animate-pulse" />
                    Live · Always on
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-bold text-gradient-cyan">A Mentor That Never Sleeps</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuaiy adapts to your pace, answers at 3 AM, and keeps you accountable —
                    so progress never stops.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: "4", l: "Mastery Paths" },
                { v: "24/7", l: "AI Mentor" },
                { v: "∞", l: "Real Skills" },
              ].map((s) => (
                <div key={s.l} className="glass-panel rounded-2xl p-4 text-center">
                  <div className="font-[Outfit] text-2xl font-bold text-gradient-gold">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </aside>

          <LeadForm />
        </div>

        <footer className="mt-16 sm:mt-24 text-center space-y-1.5">
          <div className="mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-[var(--gold-metallic)]/40 to-transparent mb-6" />
          <p className="text-xs sm:text-sm text-gradient-gold font-medium">
            © 2026 Visionary Ventures. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/80 max-w-xl mx-auto">
            Empowering innovators with AI mastery and real-world automation skills.
          </p>
        </footer>
      </div>
    </main>
  );
}
