import { Incident, statusNames } from "@/lib/incident";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "./ui/badge";
import { ClockIcon } from "lucide-react";
import { getNameFromId, Status } from "@/lib/systems";
import UpdateSection from "./update-section";

export default function IncidentDetailsCard({
    incident,
    compact,
}: {
    incident: Incident;
    compact?: boolean;
}) {
    const statusColors: Record<Status, string> = {
        up: "border-green-500 text-green-500",
        partial: "border-yellow-500 text-yellow-500",
        down: "border-red-500 text-red-500",
        "under-maintenance": "border-slate-500 text-slate-500",
    };
    return (
        <div
            className={`grid gap-2 text-black dark:text-white ${
                compact ? "" : "bg-background rounded-lg border p-4 md:p-6"
            }`}
        >
            <div className="grid gap-2">
                <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                    {!compact && (
                        <Badge
                            variant="outline"
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                statusColors[incident.status]
                            }`}
                        >
                            {statusNames[incident.status]}
                        </Badge>
                    )}
                    {new Date(incident.date) > new Date() ? (
                        <Badge className={statusColors[incident.status]} variant="outline">
                            Scheduled
                        </Badge>
                    ) : (
                        <></>
                    )}
                    <div className="text-muted-foreground flex flex-col items-center gap-2 text-sm sm:flex-row">
                        <ClockIcon className="h-4 w-4" />
                        {new Date(incident.date).toLocaleString("en-US", {
                            dateStyle: "long",
                            timeStyle: "long",
                        })}
                    </div>
                </div>
                <h2 className="text-xl font-semibold">{incident.title}</h2>
            </div>
            <div className="grid gap-2 text-sm leading-loose">
                <MDXRemote components={{ UpdateSection }} source={incident.content} />
            </div>
        </div>
    );
}
