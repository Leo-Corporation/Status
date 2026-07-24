"use client";

import IncidentCard from "@/components/incident-card";
import IncidentDetailsCard from "@/components/incident-details";
import { StatusCard } from "@/components/status-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Incident } from "@/lib/incident";
import { getSystemStatus, LeoCorpSystems, SynapsySystems } from "@/lib/systems";
import Link from "next/link";

interface HomeProps {
    incidents: Incident[];
}

export default function Home({ incidents }: Readonly<HomeProps>) {
    const openedIncidents = incidents.filter((incident) => incident.isOpen);

    function getSystemChildren(systemId: string, systemDefaultDescription: string) {
        let relevantIncidents: Incident[] = [];
        for (const element of openedIncidents) {
            if (element.services.includes(systemId)) {
                relevantIncidents.push(element);
            }
        }
        return relevantIncidents.length > 0 ? (
            <div className="grid gap-6">
                {relevantIncidents.map((incident, id) => (
                    <>
                        <IncidentDetailsCard compact incident={incident} key={id} />
                        {relevantIncidents.length - 1 !== id && <Separator className="h-1" />}
                    </>
                ))}
            </div>
        ) : (
            systemDefaultDescription
        );
    }

    return (
        <div>
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold">Core Experiences</h2>
                    <div className="mt-4 grid gap-6">
                        {LeoCorpSystems.map((system, i) => (
                            <StatusCard
                                key={i}
                                title={system.name}
                                status={getSystemStatus(openedIncidents, system.id)}
                            >
                                {getSystemChildren(system.id, system.description)}
                            </StatusCard>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Synapsy</h2>
                    <div className="mt-4 grid gap-6">
                        {SynapsySystems.map((system, i) => (
                            <StatusCard
                                key={i}
                                title={system.name}
                                status={getSystemStatus(openedIncidents, system.id)}
                            >
                                {getSystemChildren(system.id, system.description)}
                            </StatusCard>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Past Incidents</h2>
                    <div className="mt-4 grid gap-6">
                        {incidents
                            .filter((incident) => !incident.isOpen)
                            .slice(0, 3)
                            .map((incident, id) => (
                                <Link key={id} href={"incidents/" + incident.id}>
                                    <IncidentCard incident={incident} />
                                </Link>
                            ))}
                    </div>
                    <div className="flex justify-center p-2">
                        <Link href="incidents">
                            <Button variant="outline">View More</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
