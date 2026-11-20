import type { Metadata, Viewport } from "next";
import { Anybody, Inter, JetBrains_Mono, Montserrat, Open_Sans, Raleway, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { T } from "@/components/T";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { LanguageProvider } from "@/i18n/language";
import { CONTACT, PERSON, PUBLISHED_REPOS, SITE_URL } from "@/lib/site";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const anybody = Anybody({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-anybody",
  display: "swap",
});

const OG_IMAGE = {
  url: "/images/joseph-portrait.png",
  width: 800,
  height: 800,
  alt: `${PERSON.name} — ${PERSON.jobTitleFr}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: fr["meta.title"],
  description: fr["meta.description"],
  applicationName: "Scarlino",
  authors: [{ name: PERSON.name, url: PERSON.github }],
  creator: PERSON.name,
  keywords: [
    "DevOps",
    "Spécialiste DevOps",
    "DevOps & Infrastructure Specialist",
    "CI/CD",
    "GitOps",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "Docker",
    "Observabilité",
    "Antananarivo",
    "Madagascar",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Scarlino — Portfolio",
    title: fr["meta.title"],
    description: fr["meta.description"],
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    firstName: "Joseph",
    lastName: "Scarlino",
    username: "Nova20004",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: en["meta.title"],
    description: en["meta.description"],
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  other: {
    "geo.region": "MG-T",
    "geo.placename": CONTACT.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Scarlino — Portfolio",
      inLanguage: ["fr-FR", "en-US"],
      author: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      alternateName: PERSON.alias,
      jobTitle: PERSON.jobTitleEn,
      description: en["meta.description"],
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      email: `mailto:${PERSON.email}`,
      telephone: CONTACT.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.countryCode,
      },
      homeLocation: {
        "@type": "Place",
        name: `${CONTACT.city}, ${CONTACT.country}`,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "professional",
          telephone: CONTACT.phoneE164,
          email: PERSON.email,
          availableLanguage: ["French", "English"],
        },
        {
          "@type": "ContactPoint",
          contactType: "WhatsApp",
          url: CONTACT.whatsappHref,
          telephone: "+261376842420",
          availableLanguage: ["French", "English"],
        },
      ],
      knowsLanguage: ["fr", "en"],
      knowsAbout: ["DevOps", "CI/CD", "GitOps", "Kubernetes", "Docker", "Terraform", "Ansible", "Linux", "Prometheus", "Grafana"],
      sameAs: [PERSON.github],
    },
    ...PUBLISHED_REPOS.map((repo) => ({
      "@type": "SoftwareSourceCode",
      "@id": `${repo.url}#code`,
      name: repo.title,
      alternateName: repo.name,
      description: repo.description,
      codeRepository: repo.url,
      url: repo.url,
      programmingLanguage: repo.languages,
      author: { "@id": `${SITE_URL}/#person` },
    })),
  ],
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
    <html lang="fr" data-lang="fr" suppressHydrationWarning className={`${raleway.variable} ${montserrat.variable} ${openSans.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${anybody.variable}`}>
      <body className={`${anybody.variable} bg-paper font-body text-ink antialiased`}>
        <Script id="lang-boot" strategy="beforeInteractive">
          {langBoot}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
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
