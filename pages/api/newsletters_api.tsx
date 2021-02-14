import { join } from "path";
import fs from "fs";
import matter from "gray-matter";

export {};

const newslettersDirectory: string = join(process.cwd(), "_newsletters");

const _getNewsletterPaths = (): string[] => {
  return fs.readdirSync(newslettersDirectory);
};

const _getNewsletterByPath = (
  path: string,
  fields: string[] = []
): Record<string, any> => {
  const fileContents = fs.readFileSync(
    `${newslettersDirectory}/${path}`,
    "utf8"
  );
  const { content, data } = matter(fileContents);
  const newsletter: Record<string, any> = {};
  fields.forEach((field) => {
    if (field === "slug") {
      newsletter[field] = path.replace(/\.md$/, "");
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
  const paths = _getNewsletterPaths();
  const newsletters = paths.map((path) => _getNewsletterByPath(path, fields));
  return newsletters;
};