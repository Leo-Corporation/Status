"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { statusNames } from "@/lib/incident";
import { getNameFromId } from "@/lib/systems";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";
import UpdateSection from "@/components/update-section";

export interface IncidentDetailsPageProps {
    content: string;
    data: {
        [key: string]: any;
    };
}

export default function IncidentDetailsPage({ content, data }: Readonly<IncidentDetailsPageProps>) {
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
}
