import { Status } from "./systems";

export interface Incident {
    title: string;
    id: string;
    services: string[];
    date: Date;
    status: Status;
    isOpen: boolean;
    content: string; // MDX content
}
export const statusNames: Record<string, string> = {
    up: "Online",
    partial: "Partial Outage",
    down: "Down",
    "under-maintenance": "Maintenance",
};
