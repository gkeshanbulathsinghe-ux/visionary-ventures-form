import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  whatsapp_country_code: z.string().trim().min(2).max(6),
  whatsapp_number: z.string().trim().min(4).max(20),
  primary_interest: z.enum([
    "AI Automation",
    "Content Creation",
    "Digital Marketing",
    "Student Skills",
  ]),
  experience_level: z.enum(["Beginner", "Intermediate", "Professional"]),
  wants_ai_mentor: z.boolean(),
  referral_source: z.string().trim().max(200).optional().nullable(),
});

const NOTIFY_TO = "keshanbulathsinghe@gmail.com";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("form_submissions" as any)
      .insert({
        full_name: data.full_name,
        whatsapp_number: `${data.whatsapp_country_code} ${data.whatsapp_number}`.trim(),
        primary_interest: data.primary_interest,
        experience_level: data.experience_level,
        wants_ai_mentor: data.wants_ai_mentor,
        referral_source: data.referral_source ?? null,
      })
      .select("id, created_at")
      .single<{ id: string; created_at: string }>();

    if (error) {
      console.error("Lead insert failed:", error);
      throw new Error("Could not save your submission. Please try again.");
    }

    // Send notification email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    let emailSent = false;
    if (RESEND_API_KEY) {
      try {
        const html = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0b1020;color:#e6f0ff;padding:32px;border-radius:12px">
            <h2 style="color:#5ec8ff;margin:0 0 16px">🚀 New Lead — Visionary Ventures</h2>
            <p style="color:#a9b8d6;margin:0 0 24px">A new submission just landed from the AI Learning Path form.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#8fa3c7">Full Name</td><td style="padding:8px 0;font-weight:600">${escape(data.full_name)}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">WhatsApp</td><td style="padding:8px 0;font-weight:600">${escape(data.whatsapp_country_code)} ${escape(data.whatsapp_number)}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">Primary Interest</td><td style="padding:8px 0;font-weight:600">${escape(data.primary_interest)}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">Experience</td><td style="padding:8px 0;font-weight:600">${escape(data.experience_level)}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">Wants Nuaiy AI Mentor</td><td style="padding:8px 0;font-weight:600">${data.wants_ai_mentor ? "✅ Yes" : "❌ No"}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">Referral Source</td><td style="padding:8px 0;font-weight:600">${escape(data.referral_source || "—")}</td></tr>
              <tr><td style="padding:8px 0;color:#8fa3c7">Submitted</td><td style="padding:8px 0;font-weight:600">${new Date(inserted.created_at).toLocaleString()}</td></tr>
            </table>
            <p style="color:#5a6b8a;font-size:12px;margin-top:24px">Lead ID: ${inserted.id}</p>
          </div>`;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Visionary Ventures <onboarding@resend.dev>",
            to: [NOTIFY_TO],
            subject: `🚀 New Lead: ${data.full_name} — ${data.primary_interest}`,
            html,
          }),
        });
        emailSent = res.ok;
        if (!res.ok) {
          console.error("Resend error:", res.status, await res.text());
        } else {
          await supabaseAdmin.from("form_submissions" as any).update({ email_sent: true }).eq("id", inserted.id);
        }
      } catch (e) {
        console.error("Email send failed:", e);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — skipping email notification.");
    }

    return { success: true, id: inserted.id, emailSent };
  });

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}