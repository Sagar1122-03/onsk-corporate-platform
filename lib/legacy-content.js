import { readFileSync } from "node:fs";
import path from "node:path";

const contentDirectory = path.join(process.cwd(), "content");

function readContent(directory, file) {
  const filePath = path.join(contentDirectory, directory, file);
  return readFileSync(filePath, "utf8")
    .replace(/^\uFEFF/, "")
    .replaceAll("assets/", "/assets/");
}

export function readPage(file) {
  let html = readContent("pages", file);
  html = html.replace(
    /class="page-view(?: active-view)?"/,
    'class="page-view active-view"',
  );
  html = html.replace(/\sdata-route="[^"]*"/g, "");
  return html;
}

export function readShell(file) {
  let html = readContent("shell", file);
  return html.replace(/\sdata-route="[^"]*"/g, "");
}
