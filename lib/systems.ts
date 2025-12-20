import { Incident } from "./incident";

export interface System {
  name: string;
  status: Status;
  description: string;
  id: string;
}

export type Status = "up" | "partial" | "under-maintenance" | "down";

export const LeoCorpSystems: System[] = [
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
export const SynapsySystems: System[] = [
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
export const Systems: System[] = [...LeoCorpSystems, ...SynapsySystems];

export function getNameFromId(id: string): string {
  for (let i = 0; i < Systems.length; i++) {
    if (Systems[i].id === id) {
      return Systems[i].name;
    }
  }
  return id;
}

export function getSystemStatus(
  openedIncidents: Incident[],
  systemId: string
): Status {
  let statuses: Status[] = [];
  for (let i = 0; i < openedIncidents.length; i++) {
    if (openedIncidents[i].services.includes(systemId))
      statuses.push(openedIncidents[i].status);
  }
  if (statuses.includes("down")) return "down";
  if (statuses.includes("partial")) return "partial";
  if (statuses.includes("under-maintenance")) return "under-maintenance";
  return "up";
}
