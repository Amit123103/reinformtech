import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { ClientSuccessWidget } from "@/components/ui/ClientSuccessWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ReInformTech | Enterprise Software Solutions & Digital Products",
  description: "ReInformTech builds high-performance, scalable software solutions for startups and enterprises. Specializing in custom web development, mobile apps, and enterprise SaaS.",
  keywords: ["enterprise software", "custom software development", "SaaS development", "web development", "mobile apps", "UI/UX design", "tech agency"],
  authors: [{ name: "ReInformTech" }],
  openGraph: {
    title: "ReInformTech | Enterprise Software Solutions",
    description: "Building scalable digital products that drive enterprise growth. Custom software, SaaS platforms, and mobile applications.",
    type: "website",
    locale: "en_US",
    siteName: "ReInformTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReInformTech | Enterprise Software Solutions",
    description: "Building scalable digital products that drive enterprise growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className} scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[var(--color-text)] selection:text-[var(--color-background)] relative" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
