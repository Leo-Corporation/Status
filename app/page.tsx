import { parseAllIncidents } from "@/lib/incidentUtils";
import Home from "@/components/home";

export default async function Page() {
    const incidents = await parseAllIncidents();
    return <Home incidents={incidents} />;
}
