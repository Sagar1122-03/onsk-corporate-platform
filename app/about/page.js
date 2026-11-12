import StaticPage from "../../components/static-page";

export const metadata = {
  title: "About ONSK | IT, BPO & Digital Media Services in Satara",
  description:
    "Learn how ONSK combines IT engineering, BPO expertise, and creative digital media to help businesses modernize operations and unlock sustainable growth.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ONSK | IT, BPO & Digital Media Services in Satara",
    description:
      "Learn how ONSK combines IT engineering, BPO expertise, and creative digital media to help businesses modernize operations and unlock sustainable growth.",
    url: "https://onsk.co.in/about",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ONSK | IT, BPO & Digital Media Services in Satara",
    description:
      "Learn how ONSK combines IT engineering, BPO expertise, and creative digital media to help businesses modernize operations and unlock sustainable growth.",
    images: ["https://onsk.co.in/assets/logo.png"],
  },
};

export default function AboutPage() {
  return <StaticPage file="about.html" route="about" />;
}
