import { parseAllIncidents } from "@/lib/incidentUtils";
import type { Metadata } from "next";
import ViewIncidentsPage from "@/components/incident-page";

export const metadata: Metadata = {
    title: "Incidents",
    description:
        "View all active and past incidents that impacted Léo Corporation's systems and services.",
};

export default async function IncidentPage() {
    const incidents = await parseAllIncidents();
    return <ViewIncidentsPage incidents={incidents} />;
}
