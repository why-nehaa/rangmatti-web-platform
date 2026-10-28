import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RoleSwitcher from "@/components/common/RoleSwitcher";

export const metadata: Metadata = {
  title: "RangMitti 2.0 — From Mineral By-Product to Creative Material, Tribal Art & New Livelihoods",
  description: "Idea Tribe 2026 Finalist Startup Concept — Connecting mineral resources and tribal craftsmanship through standardized creative materials and verifiable digital passports in Jharkhand.",
  keywords: ["RangMitti", "Mineral Pigments", "Jharkhand Art", "Sohrai", "Khovar", "Dokra", "Sustainable Materials", "Idea Tribe 2026", "Digital Passport"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory-warm text-charcoal antialiased selection:bg-terracotta selection:text-white">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <RoleSwitcher />
        </StoreProvider>
      </body>
    </html>
  );
}
