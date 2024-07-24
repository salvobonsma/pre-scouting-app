import type {ThreatGradeType} from "@/lib/database/set-threat-grade";
import {cn} from "@/lib/utils";

export default function ThreatGrade({grade, size}: { grade: ThreatGradeType, size: "small" | "large" }) {
    let color: string;
    switch (grade) {
        case "A":
            color = "bg-green-400 dark:bg-green-600";
            break;
        case "B":
            color = "bg-teal-400 dark:bg-teal-600";
            break;
        case "C":
            color = "bg-yellow-400 dark:bg-yellow-500";
            break;
        case "D":
            color = "bg-amber-500 dark:bg-amber-600";
            break;
        case "E":
            color = "bg-orange-400 dark:bg-orange-600";
            break;
        case "F":
            color = "bg-red-500 dark:bg-red-600";
            break;
    }

    return (
          <div className={cn(
                "border rounded grid place-content-center transition-colors",
                size == "small" ? "w-10 h-10" : "w-20 h-20",
                color
          )}>
              <span className={cn("font-semibold", size == "small" ? "text-2xl" : "text-5xl")}>{grade}</span>
          </div>
    );
}

export function getIndex(grade: ThreatGradeType) {
    switch (grade) {
        case "A":
            return 0;
        case "B":
            return 1;
        case "C":
            return 2;
        case "D":
            return 3;
        case "E":
            return 4;
        case "F":
            return 5;
    }
}

export function fromIndex(index: number): ThreatGradeType {
    switch (index) {
        default:
        case 0:
            return "A";
        case 1:
            return "B";
        case 2:
            return "C";
        case 3:
            return "D";
        case 4:
            return "E";
        case 5:
            return "F";
    }
}