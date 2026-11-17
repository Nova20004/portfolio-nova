import type { Metadata } from "next";
import { Montserrat, Open_Sans, Raleway } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { T } from "@/components/T";
import { fr } from "@/i18n/fr";
import { LanguageProvider } from "@/i18n/language";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "800"],
  variable: "--font-raleway",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  title: fr["meta.title"],
  description: fr["meta.description"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

const langBoot = `
try {
  var lang = localStorage.getItem('scarlino-lang') === 'en' ? 'en' : 'fr';
  var root = document.documentElement;
  root.lang = lang;
  root.dataset.lang = lang;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-lang="fr" suppressHydrationWarning className={`${raleway.variable} ${montserrat.variable} ${openSans.variable}`}>
      <body className="bg-paper font-body text-ink antialiased">
        <Script id="lang-boot" strategy="beforeInteractive">
          {langBoot}
        </Script>
        <a className="skip-link font-ui text-sm font-bold" href="#main">
          <T k="skip" />
        </a>
        <LanguageProvider>
          <Header />
          {children}
          <PortfolioAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
