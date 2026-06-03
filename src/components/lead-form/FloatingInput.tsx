import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label: string;
  hint?: string;
  icon?: ReactNode;
  prefix?: ReactNode;
  accent?: "cyan" | "gold";
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, hint, icon, prefix, accent = "cyan", className, value, defaultValue, onFocus, onBlur, onChange, ...rest }, ref) => {
    const id = useId();
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value ?? defaultValue));
    const float = focused || hasValue || Boolean(value);
    const ringColor = accent === "gold" ? "oklch(0.82 0.14 85)" : "oklch(0.78 0.18 220)";

    return (
      <div className="space-y-1.5">
        <div
          className={cn(
            "relative flex items-center rounded-xl bg-[oklch(0.18_0.05_260/0.55)] border border-[oklch(0.6_0.12_220/0.18)] transition-all duration-300",
            focused && "border-transparent"
          )}
          style={focused ? { boxShadow: `0 0 0 1px ${ringColor}, 0 0 24px ${ringColor.replace(")", "/0.35)")}` } : undefined}
        >
          {prefix && <div className="pl-3 text-muted-foreground text-sm">{prefix}</div>}
          {icon && <div className="pl-3 text-[var(--cyan-glow)]">{icon}</div>}
          <div className="relative flex-1">
            <label
              htmlFor={id}
              className={cn(
                "absolute left-3 pointer-events-none transition-all duration-200 text-muted-foreground",
                float ? "top-1 text-[10px] uppercase tracking-wider" : "top-1/2 -translate-y-1/2 text-sm"
              )}
              style={float ? { color: ringColor } : undefined}
            >
              {label}
            </label>
            <input
              id={id}
              ref={ref}
              value={value}
              defaultValue={defaultValue}
              onFocus={(e) => { setFocused(true); onFocus?.(e); }}
              onBlur={(e) => { setFocused(false); setHasValue(Boolean(e.target.value)); onBlur?.(e); }}
              onChange={(e) => { setHasValue(Boolean(e.target.value)); onChange?.(e); }}
              className={cn(
                "w-full bg-transparent outline-none px-3 pt-5 pb-2 text-foreground placeholder:text-transparent",
                className
              )}
              {...rest}
            />
          </div>
        </div>
        {hint && <p className="text-[11px] text-muted-foreground pl-1">{hint}</p>}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";