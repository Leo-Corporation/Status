import { input, select, checkbox } from "@inquirer/prompts";
import * as fs from "fs";
import * as path from "path";
const LeoCorpSystems = [
  {
    id: "web",
    name: "Web Experiences",
    status: "up",
    description:
      "Our web applications are running smoothly and serving customers without any issues.",
  },
  {
    id: "update",
    name: "Update System",
    status: "up",
    description: "Our automated update system is working as expected.",
  },
  {
    id: "gavilya-services",
    name: "Gavilya Services",
    status: "up",
    description: "All Gavilya services are working as expected.",
  },
];
const SynapsySystems = [
  {
    id: "write",
    name: "Write",
    status: "up",
    description:
      "Our writing platform is operating normally, allowing users to create and publish content without any issues.",
  },
  {
    id: "genidoc",
    name: "Genidoc",
    status: "up",
    description: "Genidoc is operating normally.",
  },
];
const Systems = [...LeoCorpSystems, ...SynapsySystems];
const statuses = [
  { name: "Up", value: "up" },
  { name: "Partial Outage", value: "partial" },
  { name: "Down", value: "down" },
  { name: "Maintenance", value: "under-maintenance" },
];

const sys = Systems.map((system) => {
  return { name: system.name, value: system.id };
});

const getUserInput = async () => {
  const title = await input({ message: "Enter the title:" });
  const description = await input({ message: "Enter the description:" });
  const systems = await checkbox({
    message: "Enter the affected system(s):",
    choices: sys,
  });
  const status = await select({
    message: "Select the status:",
    choices: statuses,
  });

  return { title, description, systems, status };
};

const createMdxFile = (
  title: string,
  description: string,
  systems: string[],
  status: string
) => {
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = path.join(
    "./app/incidents",
    `${dateStr}_${title.replace(/ /g, "-").toLowerCase()}.mdx`
  );

  const yamlFrontmatter = `---
title: ${title}
date: "${new Date().toISOString()}"
status: ${status}
services:
  - ${systems.join("\n  - ")}
isOpen: true
---

${description}
`;

  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, yamlFrontmatter);
  console.log(`MDX file created at ${filename}`);
};

const main = async () => {
  const { title, description, systems, status } = await getUserInput();
  createMdxFile(title, description, systems, status);
};

main();
