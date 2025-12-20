import IncidentCard from "@/components/incident-card";
import IncidentDetailsCard from "@/components/incident-details";
import { StatusCard } from "@/components/status-card";
import { Button } from "@/components/ui/button";
import { parseAllIncidents } from "@/lib/incidentUtils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Incidents",
  description:
    "View all active and past incidents that impacted Léo Corporation's systems and services.",
};

export default async function ViewIncidentsPage() {
  const incidents = await parseAllIncidents();
  const openedIncidents = incidents.filter((incident) => incident.isOpen);
  return (
    <div>
      <Link href="/">
        <Button variant="outline" className="h-7 space-x-2 px-2 mb-2">
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </Link>
      <h2 className="text-2xl font-bold">Active Incidents</h2>
      {openedIncidents.length === 0 && (
        <div className="my-4">
          <StatusCard status="up" title="No active incidents">
            All our services are working as expected.
          </StatusCard>
        </div>
      )}
      {openedIncidents.length > 0 && (
        <div className="gap-6 grid mt-4">
          {openedIncidents.map((incident, id) => (
            <IncidentDetailsCard compact={false} incident={incident} key={id} />
          ))}
        </div>
      )}
      <div className="grid gap-6 mt-4"></div>
      <h2 className="text-2xl font-bold">Past Incidents</h2>
      <div className="grid gap-6 mt-4">
        {incidents
          .filter((incident) => !incident.isOpen)
          .map((incident, id) => (
            <Link key={id} href={"incidents/" + incident.id}>
              <IncidentCard incident={incident} />
            </Link>
          ))}
      </div>
    </div>
  );
}
