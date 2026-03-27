import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TRPG Poker Room",
  description: "Realtime chat + seven poker room",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
