import StaticPage from "../components/static-page";

export const metadata = {
  title: "ONSK | IT Software, OCR & Creative Digital Solutions",
  description:
    "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ONSK | IT Software, OCR & Creative Digital Solutions",
    description:
      "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
    url: "https://onsk.co.in/",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONSK | IT Software, OCR & Creative Digital Solutions",
    description:
      "Discover ONSK for scalable software products, AI-powered OCR, document automation, creative media, and business process services built for measurable growth.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
};

export default function HomePage() {
  return <StaticPage file="home.html" route="home" />;
}
