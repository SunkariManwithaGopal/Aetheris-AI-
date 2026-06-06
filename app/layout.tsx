// app/layout.tsx
import type { Metadata } from "next";
// @ts-ignore
import "./globals.css"; // ◄── CRITICAL: Make sure this specific relative import line exists!

export const metadata: Metadata = {
  title: "Autonomous Research Suite",
  description: "Next-Generation Intelligence Report Synthesis Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}