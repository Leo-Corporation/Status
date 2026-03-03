import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UpdateSection from "@/components/update-section";
import { statusNames } from "@/lib/incident";
import { parseAllIncidents } from "@/lib/incidentUtils";
import { getIncidentContent } from "@/lib/mdxUtils";
import { getNameFromId } from "@/lib/systems";
import { ArrowLeftIcon, ClockIcon } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

export async function generateMetadata(
    props: { params: Promise<any> },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const params = await props.params;
    const { content, data } = getIncidentContent(params.slug);

    return {
        title: data.title,
        description: `Learn more about the incident "${data.title}" that occured on ${new Date(
            data.date,
        ).toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "long",
        })}, affecting ${(data.services as string[]).map((service, i) => {
            return `${getNameFromId(service)}${
                (data.services as string[]).length - 1 === i ? "" : ", "
            }`;
        })}.`,
    };
}

const IncidentPage = async (props: { params: Promise<any> }) => {
    const params = await props.params;
    const { content, data } = getIncidentContent(params.slug);

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="outline" size="icon" className="h-7 w-7">
                            <ArrowLeftIcon className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                    </Link>
                    <h1 className="flex-1 shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {data.title ?? "Incident Details"}
                    </h1>
                </div>
                <div className="bg-background grid gap-2 rounded-lg border p-4 md:p-6">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="outline"
                                className="rounded-full px-3 py-1 text-sm font-medium"
                            >
                                {data.isOpen ? "Active" : "Resolved"}
                            </Badge>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                <ClockIcon className="h-4 w-4" />
                                {new Date(data.date).toLocaleString("en-US", {
                                    dateStyle: "long",
                                    timeStyle: "long",
                                })}
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">
                            {statusNames[data.status]} -{" "}
                            {typeof data.services !== "undefined"
                                ? (data.services as string[]).map(
                                      (service, id) =>
                                          getNameFromId(service) +
                                          ((data.services as string[]).length - 1 === id
                                              ? ""
                                              : ", "),
                                  )
                                : ""}
                        </h2>
                    </div>
                    <Separator />
                    <div className="grid gap-2 text-sm leading-loose">
                        <MDXRemote components={{ UpdateSection }} source={content} />
                    </div>
                </div>
            </div>
            <div className="bg-background grid gap-4 rounded-lg border p-4 md:p-6">
                <h2 className="text-xl font-semibold">Incident Data</h2>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="grid gap-1">
                        <div className="text-muted-foreground text-sm font-medium">State</div>
                        <div className="text-base font-medium">
                            {data.isOpen ? "Active" : "Resolved"}
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <div className="text-muted-foreground text-sm font-medium">Status</div>
                        <div className="text-base font-medium">{statusNames[data.status]}</div>
                    </div>
                    <div className="grid gap-1">
                        <div className="text-muted-foreground text-sm font-medium">Date</div>
                        <div className="text-base font-medium">
                            {new Date(data.date).toLocaleString("en-US")}
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <div className="text-muted-foreground text-sm font-medium">Title</div>
                        <div className="text-base font-medium">{data.title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentPage;

export async function generateStaticParams() {
    const incidents = await parseAllIncidents();

    return incidents.map((incident) => ({
        slug: incident.id,
    }));
}
