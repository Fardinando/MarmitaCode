import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "MarmitaCode | Solução entregue quentinha",
  description: "Servindo a solução quentinha para você. Sistemas personalizados para pequenas empresas em ascensão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${plusJakarta.variable}`}>
      <body className="antialiased">
        <SiteHeader />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
