import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["cyrillic"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "ToDo-List",
  description: "ToDo List",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
