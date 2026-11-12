import StaticPage from "../../components/static-page";

export const metadata = {
  title: "ONSK Services | Software, BPO & Creative Media Solutions",
  description:
    "From custom software development to BPO, graphics, videos, AI ads, and UGC, ONSK helps brands scale with smarter digital operations and smarter growth.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "ONSK Services | Software, BPO & Creative Media Solutions",
    description:
      "From custom software development to BPO, graphics, videos, AI ads, and UGC, ONSK helps brands scale with smarter digital operations and smarter growth.",
    url: "https://onsk.co.in/services",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONSK Services | Software, BPO & Creative Media Solutions",
    description:
      "From custom software development to BPO, graphics, videos, AI ads, and UGC, ONSK helps brands scale with smarter digital operations and smarter growth.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
};

export default function ServicesPage() {
  return <StaticPage file="services.html" route="services" />;
}
