import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getMdxContent = (filePath: string) => {
    const source = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(source);
    return { content, data };
};

export const getIncidentContent = (slug: string) => {
    const filePath = path.join(process.cwd(), "app/incidents", slug + ".mdx");
    return getMdxContent(filePath);
};
