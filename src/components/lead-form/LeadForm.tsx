import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, GraduationCap, Megaphone, Wand2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/leads.functions";
import { FloatingInput } from "./FloatingInput";
import { SuccessState } from "./SuccessState";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
];

const INTERESTS = [
  { value: "AI Automation", icon: Bot, desc: "Automate workflows" },
  { value: "Content Creation", icon: Wand2, desc: "Create viral content" },
  { value: "Digital Marketing", icon: Megaphone, desc: "Master funnels" },
  { value: "Student Skills", icon: GraduationCap, desc: "Build the future" },
] as const;

const LEVELS = ["Beginner", "Intermediate", "Professional"] as const;
const REFERRALS = ["Instagram", "Facebook", "TikTok", "YouTube", "WhatsApp", "Friend / Referral", "Google Search", "Event / Workshop", "Other"];

type Interest = (typeof INTERESTS)[number]["value"];
type Level = (typeof LEVELS)[number];

export function LeadForm() {
  const submit = useServerFn(submitLead);
  const [country, setCountry] = useState("+94");
  const [interest, setInterest] = useState<Interest | "">("");
  const [level, setLevel] = useState<Level>("Beginner");
  const [wantsMentor, setWantsMentor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const full_name = String(fd.get("full_name") || "").trim();
    const whatsapp_number = String(fd.get("whatsapp_number") || "").trim();
    const referral_source = String(fd.get("referral_source") || "").trim();

    if (!full_name || full_name.length < 2) return toast.error("Please enter your full name.");
    if (!whatsapp_number || whatsapp_number.length < 4) return toast.error("Please enter a valid WhatsApp number.");
    if (!interest) return toast.error("Choose your primary interest.");
    if (wantsMentor === null) return toast.error("Tell us if you want the 24/7 AI Mentor.");

    setLoading(true);
    try {
      await submit({
        data: {
          full_name,
          whatsapp_country_code: country,
          whatsapp_number,
          primary_interest: interest,
          experience_level: level,
          wants_ai_mentor: wantsMentor,
          referral_source: referral_source || null,
        },
      });
      setSubmittedName(full_name);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submittedName) return <SuccessState name={submittedName} />;

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative glass-panel glow-border rounded-3xl p-6 sm:p-10 space-y-7"
    >
      <div className="absolute inset-0 grid-bg opacity-20 rounded-3xl pointer-events-none" />

      <div className="relative space-y-7">
        <FloatingInput
          name="full_name"
          label="Full Name"
          hint="To personalize your certificates and emails."
          autoComplete="name"
          required
        />

        {/* WhatsApp with country code */}
        <div className="space-y-1.5">
          <div className="flex gap-2">
            <div className="relative shrink-0">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-full appearance-none rounded-xl bg-[oklch(0.18_0.05_260/0.55)] border border-[oklch(0.6_0.12_220/0.18)] px-3 pr-8 py-4 text-sm text-foreground outline-none focus:border-[var(--cyan-glow)] focus:ring-2 focus:ring-[var(--cyan-glow)]/30 transition-all"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-[var(--navy-deep)]">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <FloatingInput
                name="whatsapp_number"
                label="WhatsApp Number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground pl-1">We'll only contact you for course updates and your AI mentor onboarding.</p>
        </div>

        {/* Primary Interest cards */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.18em] text-[var(--cyan-glow)]/80 font-semibold">
            Primary Interest
          </label>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(({ value, icon: Icon, desc }) => {
              const active = interest === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setInterest(value)}
                  className={cn(
                    "group relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden",
                    active
                      ? "border-[var(--cyan-glow)] bg-[var(--cyan-glow)]/10 shadow-[0_0_24px_oklch(0.78_0.18_220/0.35)]"
                      : "border-[oklch(0.6_0.12_220/0.18)] bg-[oklch(0.18_0.05_260/0.4)] hover:border-[var(--cyan-glow)]/50"
                  )}
                >
                  <Icon className={cn("w-5 h-5 mb-2 transition-colors", active ? "text-[var(--cyan-glow)]" : "text-muted-foreground group-hover:text-[var(--cyan-glow)]")} />
                  <div className="text-sm font-semibold text-foreground">{value}</div>
                  <div className="text-[11px] text-muted-foreground">{desc}</div>
                  {active && (
                    <motion.div
                      layoutId="interest-glow"
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ boxShadow: "inset 0 0 30px oklch(0.78 0.18 220 / 0.25)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience level */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-[0.18em] text-[var(--cyan-glow)]/80 font-semibold">
            Current Experience Level
          </label>
          <div className="relative grid grid-cols-3 p-1 rounded-full bg-[oklch(0.18_0.05_260/0.6)] border border-[oklch(0.6_0.12_220/0.2)]">
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className="relative z-10 py-2.5 text-sm font-medium transition-colors"
              >
                {level === l && (
                  <motion.div
                    layoutId="level-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--blue-electric)] shadow-[0_0_20px_oklch(0.78_0.18_220/0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={cn("relative", level === l ? "text-[var(--navy-deep)] font-semibold" : "text-muted-foreground")}>
                  {l}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Mentor toggle */}
        <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-[oklch(0.22_0.08_240/0.6)] to-[oklch(0.18_0.05_260/0.4)] border border-[var(--cyan-glow)]/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--gold-metallic)] mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                Would you like a 24/7 AI Mentor to guide your learning journey?
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Powered by Nuaiy — never sleeps, always on.</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: true, label: "Yes, ignite Nuaiy", accent: "cyan" as const },
              { val: false, label: "Not right now", accent: "muted" as const },
            ].map((opt) => {
              const active = wantsMentor === opt.val;
              return (
                <button
                  key={String(opt.val)}
                  type="button"
                  onClick={() => setWantsMentor(opt.val)}
                  className={cn(
                    "relative py-3 rounded-xl text-sm font-semibold transition-all duration-300 border",
                    active && opt.accent === "cyan" && "border-transparent bg-gradient-to-r from-[var(--cyan-glow)] to-[var(--blue-electric)] text-[var(--navy-deep)] shadow-[0_0_28px_oklch(0.78_0.18_220/0.55)]",
                    active && opt.accent === "muted" && "border-[var(--gold-metallic)]/50 bg-[var(--gold-metallic)]/10 text-[var(--gold-metallic)]",
                    !active && "border-[oklch(0.6_0.12_220/0.2)] bg-[oklch(0.18_0.05_260/0.4)] text-muted-foreground hover:border-[var(--cyan-glow)]/40"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Referral */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-[0.18em] text-[var(--cyan-glow)]/80 font-semibold pl-1">
            How did you hear about Visionary Ventures?
          </label>
          <div className="relative">
            <select
              name="referral_source"
              defaultValue=""
              className="w-full appearance-none rounded-xl bg-[oklch(0.18_0.05_260/0.55)] border border-[oklch(0.6_0.12_220/0.18)] px-4 py-4 text-sm text-foreground outline-none focus:border-[var(--gold-metallic)] focus:ring-2 focus:ring-[var(--gold-metallic)]/30 transition-all"
            >
              <option value="" className="bg-[var(--navy-deep)]">Select a source…</option>
              {REFERRALS.map((r) => (
                <option key={r} value={r} className="bg-[var(--navy-deep)]">{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full py-4 rounded-xl font-bold text-base text-[var(--navy-deep)] bg-gradient-to-r from-[var(--cyan-glow)] via-[var(--blue-electric)] to-[var(--gold-metallic)] bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-[0_10px_40px_-10px_oklch(0.65_0.20_245/0.6)] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Securing your spot…
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Activate My AI Journey
              </>
            )}
          </span>
        </button>
      </div>
    </motion.form>
  );
}