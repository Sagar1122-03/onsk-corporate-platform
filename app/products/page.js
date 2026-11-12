import StaticPage from "../../components/static-page";

export const metadata = {
  title: "ONSK OCR Software | Handwriting Recognition & Data Capture",
  description:
    "Automate banking, invoicing, and document processing with ONSK OCR software for handwriting recognition, data extraction, and enterprise-ready accuracy.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "ONSK OCR Software | Handwriting Recognition & Data Capture",
    description:
      "Automate banking, invoicing, and document processing with ONSK OCR software for handwriting recognition, data extraction, and enterprise-ready accuracy.",
    url: "https://onsk.co.in/products",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONSK OCR Software | Handwriting Recognition & Data Capture",
    description:
      "Automate banking, invoicing, and document processing with ONSK OCR software for handwriting recognition, data extraction, and enterprise-ready accuracy.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
};

export default function ProductsPage() {
  return <StaticPage file="products.html" route="products" />;
}
