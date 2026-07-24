import { parseAllIncidents } from "@/lib/incidentUtils";
import { getIncidentContent } from "@/lib/mdxUtils";
import { getNameFromId } from "@/lib/systems";
import type { Metadata, ResolvingMetadata } from "next";
import IncidentDetailsPage from "@/app/incidents/[slug]/incident-details-page";

export async function generateMetadata(
    props: { params: Promise<any> },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const params = await props.params;
    const { data } = getIncidentContent(params.slug);

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

    return <IncidentDetailsPage content={content} data={data} />;
};

export default IncidentPage;

export async function generateStaticParams() {
    const incidents = await parseAllIncidents();

    return incidents.map((incident) => ({
        slug: incident.id,
    }));
}
