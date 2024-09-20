'use server'

import {ActionResult} from "@/lib/database/action-result";
import {tba} from "@/lib/tba/tba";
import prisma from "@/lib/prisma";
import GenerateTeam from "@/lib/database/generate/segments/generate-team";
import {redirect} from "next/navigation";
import GenerateStats from "@/lib/database/generate/segments/generate-stats";

export default async function NewEvent(key: string, year: number, name: string): Promise<ActionResult> {
    const event = (await tba.GET("/event/{event_key}", {
        params: {
            path: {event_key: key},
        },
    }))
    if (!event.data) {
        return {success: false, message: "TBA API request error (a): " + event.response.status}
    }

    if (await prisma.event.findUnique({
        where: {
            name: name
        }
    })) return {success: false, message: "Name has already been taken"};

    const eventId = (await prisma.event.create({
        data: {
            key: key,
            year: year,
            startDate: event.data.start_date,
            endDate: event.data.end_date,
            name: name,
            eventName: event.data.name,
            district: event.data.district?.display_name,
            type: event.data.event_type_string,
            city: event.data.city
        }
    })).id;

    // Missing 8 teams not on tba.
    const teamNumbers: number[] = [
        360, 4682, 948, 5683, 1294, 5937, 1778, 6390, 2046, 7461, 2147, 7627, 2412,
        8051, 2522, 9023, 2557, 9442, 2910, 9450, 2930, 4089
    ]

    // Generate Teams
    const tbaTeams = await Promise.all(teamNumbers.map(async value => {
        return (await tba.GET("/team/{team_key}", {
            params: {
                path: {team_key: `frc${value}`},
            },
        })).data;
    }));

    const generateTeamsError = (await Promise.all(
          tbaTeams.map((team) => GenerateTeam(team, eventId, year, tbaTeams.length, true))
    )).find(res => !res.success);
    if (generateTeamsError) return generateTeamsError;

    await GenerateStats(eventId, false);

    return redirect("/" + eventId);
}