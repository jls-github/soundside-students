import { join } from "path";
import fs from "fs";
import matter from 'gray-matter';

export {};

const newslettersDirectory: string = join(process.cwd(), "_newsletters");

export const getNewsletterPaths = (): string[] => {
  return fs.readdirSync(newslettersDirectory);
};

export const getNewsletterByPath = (path: string): {slug: string, title: string} => {
    const slug = path.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(path, 'utf8');
    const {data} = matter(fileContents)
    const newsletter = {slug: slug, title: data["title"]}
    return newsletter
}

export const getNewsletters = (): { slug: string, title: string }[] => {
  const paths = getNewsletterPaths();
  const newsletters = paths.map((path) => getNewsletterByPath(path))
  return newsletters;
};
