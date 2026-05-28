import "./globals.css";
import type { Metadata } from "next";
import AppProvider from "../providers/app-provider";

export const metadata: Metadata = {
  title: "Delana",
  description: "فروشگاه آنلاین دلانا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
