import fsp from "fs/promises";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Incident } from "./incident";
import { getMdxContent } from "./mdxUtils";

const incidentDirectory = path.join(process.cwd(), "Incident");

export async function getIncidentData(): Promise<Incident[]> {
    const incidentFiles = fs.readdirSync(incidentDirectory);
    const incidents: Incident[] = [];

    for (const file of incidentFiles) {
        const fullPath = path.join(incidentDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const incident: Incident = {
            id: file.replace(".mdx", ""),
            title: data.title,
            services: data.services,
            status: data.status,
            isOpen: data.isOpen,
            date: data.date,
            content, // Include the MDX content
        };

        incidents.push(incident);
    }

    return incidents;
}

export async function parseAllIncidents(): Promise<Incident[]> {
    const INCIDENTS_FOLDER = path.join(process.cwd(), "app", "incidents");
    const incidentFiles = await fsp.readdir(INCIDENTS_FOLDER);

    const incidents: (Incident | undefined)[] = await Promise.all(
        incidentFiles.map(async (file) => {
            const slug = path.basename(file, ".mdx");
            if (slug === "[slug]" || slug === "page.tsx") return;
            const postFile = fs.readFileSync(`${INCIDENTS_FOLDER}/${slug}.mdx`, "utf-8");
            const mdxContent = matter(postFile);
            return {
                title: mdxContent.data.title,
                id: slug,
                services: mdxContent.data.services,
                date: mdxContent.data.date,
                status: mdxContent.data.status,
                isOpen: mdxContent.data.isOpen,
                content: mdxContent.content,
            };
        }),
    );
    const filteredIncident = incidents.filter((item): item is Incident => item !== undefined);

    return filteredIncident.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
