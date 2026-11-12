import { readPage } from "../lib/legacy-content";

export default function StaticPage({ file }) {
  const html = readPage(file);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
