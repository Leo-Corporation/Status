"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { StatusCard } from "@/components/status-card";
import IncidentDetailsCard from "@/components/incident-details";
import IncidentCard from "@/components/incident-card";
import { Incident } from "@/lib/incident";

export interface IncidentPageProps {
    incidents: Incident[];
}

export default function ViewIncidentsPage({ incidents }: Readonly<IncidentPageProps>) {
    const openedIncidents = incidents.filter((incident) => incident.isOpen);
    return (
        <div>
            <Link href="/public">
                <Button variant="outline" className="mb-2 h-7 space-x-2 px-2">
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
                <div className="mt-4 grid gap-6">
                    {openedIncidents.map((incident, id) => (
                        <IncidentDetailsCard compact={false} incident={incident} key={id} />
                    ))}
                </div>
            )}
            <div className="mt-4 grid gap-6"></div>
            <h2 className="text-2xl font-bold">Past Incidents</h2>
            <div className="mt-4 grid gap-6">
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
