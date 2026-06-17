import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { FloatingParticles } from "@/components/motion/floating-particles";

export const metadata: Metadata = {
  title: "AGENT SHUFFLE",
  description: "Visual intelligence platform for exploring and assembling Collective AI agent teams.",
  metadataBase: new URL("https://agent-shuffle.local")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FloatingParticles />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
