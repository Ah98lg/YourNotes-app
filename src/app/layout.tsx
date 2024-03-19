import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "YourNotes App",
  description: "A simple note-taking app built with Next.js.",
  icons: [{ rel: "icon", url: "/note-icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable}`}>{children}
      </body>
    </html>
  );
}
