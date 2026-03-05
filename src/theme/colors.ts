// src/theme/colors.ts
export const colors = {
  // Brand
  primary: "#2563EB",
  accent: "#7C3AED",

  // Backgrounds
  background: "#F7F8FF",
  bg1: "#EEF2FF",
  bg2: "#F5F3FF",

  // Surfaces
  card: "#FFFFFF",
  border: "#E5E7EB",

  // Text (new)
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textLight: "#FFFFFF",

  // Pills / chips
  pillBg: "#EEF2FF",
  pillText: "#4338CA",

  // Options
  optionBg: "#F3F4F6",
  optionSelectedBg: "#EFF6FF",
  optionSelectedBorder: "#2563EB",
  wrongBg: "#FEE2E2",
  wrongBorder: "#F87171",
  correctBg: "#DCFCE7",
  correctBorder: "#22C55E",

// Topbar (soft blue)
// Topbar (neutral)
topbarBg: "#FFFFFF",
topbarSurface: "#FFFFFF",
topbarTitle: "#111827",
topbarEyebrow: "#6B7280",
topbarAccent: "#2563EB",
topbarBorder: "rgba(17,24,39,0.08)",
  // ✅ ALIASES for older code (so TS errors disappear)
  text: "#111827",              // legacy -> maps to textPrimary
  secondary: "#4338CA",         // legacy secondary brand color (use pillText-ish)
  success: "#22C55E",           // legacy success
  sidebarBg: "#111827",         // legacy sidebar background (or change to match your sidebar)
  sidebarText: "#FFFFFF",       // legacy sidebar text
} as const;