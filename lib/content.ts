import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ContentSection {
  title: string;
  image?: string;
  body: string;
}

export interface ContentFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  icon?: string;
  order?: number;
  heroImage?: string;
  featureImage?: string;
  featureTitle?: string;
  sections?: ContentSection[];
}

export interface ContentDocument extends ContentFrontmatter {
  slug: string;
  body: string;
}

function readDocument(relativePath: string): ContentDocument {
  const filePath = path.join(contentDirectory, relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    ...(parsed.data as ContentFrontmatter),
    slug: path.basename(relativePath, ".md"),
    body: parsed.content.trim(),
  };
}

export function getServices(locale: string): ContentDocument[] {
  const directory = path.join(contentDirectory, locale, "services");

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readDocument(path.join(locale, "services", fileName)))
    .sort((first, second) => (first.order ?? 0) - (second.order ?? 0));
}

export function getService(locale: string, slug: string): ContentDocument {
  return readDocument(path.join(locale, "services", `${slug}.md`));
}

export function getCountry(locale: string, country: string): ContentDocument {
  return readDocument(
    path.join(locale, "international", "renovation-energetique", `${country}.md`),
  );
}

export function getInternationalPage(locale: string, slug: string): ContentDocument {
  return readDocument(path.join(locale, "international", `${slug}.md`));
}

export function getContactPage(locale: string): ContentDocument {
  return readDocument(path.join(locale, "contact.md"));
}