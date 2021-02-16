import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

export {};

const newslettersDirectory: string = join(process.cwd(), "_newsletters");

export const getNewsletterSlugs = (): string[] => {
  return fs.readdirSync(newslettersDirectory);
};

export const getNewsletterBySlug = (
  slug: string,
  fields: string[] = []
): Record<string, any> => {
  const fileContents = fs.readFileSync(
    `${newslettersDirectory}/${slug}`,
    "utf8"
  );
  const { content, data } = matter(fileContents);
  const newsletter: Record<string, any> = {};
  fields.forEach((field) => {
    if (field === "slug") {
      newsletter[field] = slug.replace(/\.md$/, "");
    } else if (field === "content") {
      newsletter[field] = content;
    }

    if (data[field]) {
      newsletter[field] = data[field];
    }
  });
  return newsletter;
};

export const getNewsletters = (
  fields: string[] = []
): Record<string, any>[] => {
  const slugs = getNewsletterSlugs();
  const newsletters = slugs.map((slug) => getNewsletterBySlug(slug, fields));
  return newsletters;
};
