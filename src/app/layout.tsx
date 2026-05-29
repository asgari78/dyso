import "./globals.css";
import type { Metadata } from "next";
import AppProvider from "../providers/app-provider";

export const metadata: Metadata = {
  title: "Dyso",
  description: "سفارش اختصاصی ات را طراحی کن",
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
