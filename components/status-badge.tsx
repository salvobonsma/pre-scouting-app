import {Badge} from "@/components/ui/badge";
import {TeamStatus} from "@/lib/database/set-team-statues";


export default function StatusBadge({status}: { status: TeamStatus }) {
    let display;
    let variant: "destructive" | "secondary" | "default";
    switch (status) {
        case "notStarted":
            display = "Not started";
            variant = "destructive"
            break;
        case "inProgress":
            display = "In progress";
            variant = "secondary"
            break;
        case "completed":
            display = "Completed";
            variant = "default"
            break;
    }

    return (
          <Badge variant={variant ?? "default"} className={"whitespace-nowrap"}>{(display)}</Badge>
    )
}