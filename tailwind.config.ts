import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050A18",
        ink: "#0A1024",
        glass: "rgba(15, 23, 42, 0.52)"
      },
      boxShadow: {
        "glow-sm": "0 0 24px rgba(124, 58, 237, 0.24)",
        "glow-md": "0 0 44px rgba(34, 211, 238, 0.24)",
        "glow-lg": "0 28px 90px rgba(0, 0, 0, 0.52)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"]
      }
    }
  }
};

export default config;
