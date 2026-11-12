import StaticPage from "../../components/static-page";

export const metadata = {
  title: "Contact ONSK | Satara Software, Media & Inquiry Support",
  description:
    "Get in touch with ONSK for project inquiries, software partnerships, creative briefs, or a live OCR demo tailored to your business needs and growth goals.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ONSK | Satara Software, Media & Inquiry Support",
    description:
      "Get in touch with ONSK for project inquiries, software partnerships, creative briefs, or a live OCR demo tailored to your business needs and growth goals.",
    url: "https://onsk.co.in/contact",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ONSK | Satara Software, Media & Inquiry Support",
    description:
      "Get in touch with ONSK for project inquiries, software partnerships, creative briefs, or a live OCR demo tailored to your business needs and growth goals.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
};

export default function ContactPage() {
  return <StaticPage file="contact.html" route="contact" />;
}
