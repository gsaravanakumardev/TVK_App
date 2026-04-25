import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  "data-testid"?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = "Select...", disabled, "data-testid": testId }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full" data-testid={testId}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded border text-sm transition-colors text-left"
        style={{
          background: "hsl(var(--card))",
          color: disabled ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))",
          borderColor: open ? "#C8102E" : "hsl(var(--border))",
          boxShadow: open ? "0 0 0 2px rgba(200,16,46,0.15)" : undefined,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className="shrink-0 transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "#C8102E",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div
          className="absolute z-50 mt-1 w-full rounded overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1.5px solid #C8102E",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-left transition-colors"
                style={{
                  background: isSelected ? "#F4C430" : "transparent",
                  color: isSelected ? "#1A1A1A" : "hsl(var(--foreground))",
                  fontWeight: isSelected ? 600 : 400,
                }}
                onMouseEnter={e => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(244,196,48,0.25)";
                }}
                onMouseLeave={e => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} style={{ color: "#1A1A1A" }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
