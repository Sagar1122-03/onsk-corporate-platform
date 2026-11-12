import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { readShell } from "../lib/legacy-content";
import RouteEffects from "../components/route-effects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://onsk.co.in"),
  title: "ONSK | IT Software, OCR & Creative Digital Solutions",
  description:
    "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
  keywords: [
    "ONSK",
    "OCR software",
    "handwriting recognition",
    "custom software development",
    "digital media",
    "Satara IT company",
  ],
  authors: [{ name: "ONSK – Overseas Network System & Knowledge" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ONSK",
    locale: "en_IN",
    title: "ONSK | IT Software, OCR & Creative Digital Solutions",
    description:
      "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
    url: "https://onsk.co.in/",
    images: [{
      url: "https://onsk.co.in/assets/logo.png",
      width: 1200,
      height: 630,
      alt: "ONSK logo",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONSK | IT Software, OCR & Creative Digital Solutions",
    description:
      "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  icons: {
    icon: "/assets/logo.png",
  },
};

export const viewport = {
  themeColor: "#0066ff",
};

function LegacyMarkup({ file }) {
  const html = readShell(file);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LegacyMarkup file="header.html" />
        <LegacyMarkup file="floating-enquiry.html" />
        <main id="mainContent" role="main">
          {children}
        </main>
        <LegacyMarkup file="modal.html" />
        <LegacyMarkup file="footer.html" />
        <RouteEffects />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://onsk.co.in/#organization",
                name: "ONSK – Overseas Network System & Knowledge",
                alternateName: [
                  "ONSK",
                  "ONSK Satara",
                  "Overseas Network System and Knowledge",
                ],
                url: "https://onsk.co.in/",
                logo: "https://onsk.co.in/assets/logo.png",
                description:
                  "IT software development, creative digital media, and proprietary AI-based OCR technology company based in Satara, Maharashtra.",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "Lalaji Pride, 20, YC College Road, near Abhaysinghraje Bhosale kamaan, Kamathipura, Guruwar Peth",
                  addressLocality: "Satara",
                  addressRegion: "Maharashtra",
                  postalCode: "415001",
                  addressCountry: "IN",
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+91-9970141332",
                  contactType: "customer service",
                  availableLanguage: ["English", "Hindi", "Marathi"],
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://onsk.co.in/products#software",
                name: "ONSK OCR",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web, Linux, Windows",
                description:
                  "Intelligent Document Processing and handwriting recognition software engineered for banking cheques, invoices, and automated data entry.",
              },
            ],
          })}
        </Script>
        <Script
          src="https://unpkg.com/lucide@latest"
          strategy="beforeInteractive"
        />
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
