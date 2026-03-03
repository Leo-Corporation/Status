import { Incident } from "@/lib/incident";
import { Badge } from "./ui/badge";
import { ClockIcon } from "lucide-react";

interface IncidentCardProps {
    incident: Incident;
}

export default function IncidentCard(props: IncidentCardProps) {
    return (
        <div className="bg-background grid gap-4 rounded-lg border p-4 sm:grid-cols-[1fr_auto] md:p-6">
            <h2 className="text-lg font-semibold">{props.incident.title}</h2>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <ClockIcon className="h-4 w-4" />
                <p>
                    {new Date(props.incident.date).toLocaleString("en-US", {
                        dateStyle: "long",
                        timeStyle: "long",
                    })}
                </p>
                <Badge
                    variant="outline"
                    className="hidden rounded-full px-3 py-1 text-sm font-medium sm:block"
                >
                    {props.incident.date > new Date()
                        ? "Scheduled"
                        : props.incident.isOpen
                          ? "Active"
                          : "Resolved"}
                </Badge>
            </div>
        </div>
    );
}
