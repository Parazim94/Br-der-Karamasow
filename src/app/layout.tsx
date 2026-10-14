import type { Metadata, Viewport } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karamasow-Begleiter",
  description: "Spoilerfreier Lesebegleiter zu „Die Brüder Karamasow“",
  appleWebApp: { capable: true, title: "Karamasow", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#17130f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${geistSans.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full">
        <main className="mx-auto w-full max-w-md px-4 pb-28 pt-6">{children}</main>
        <ServiceWorker />
      </body>
    </html>
  );
}
