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

    // Generate Teams
    const tbaTeams = (await tba.GET("/event/{event_key}/teams", {
        params: {
            path: {event_key: key},
        },
    }));
    if (!tbaTeams.data) {
        return {success: false, message: "TBA API request error (b): " + tbaTeams.response.status}
    }

    const generateTeamsError = (await Promise.all(
          tbaTeams.data.map((team) => GenerateTeam(team, eventId, year, tbaTeams.data.length, true))
    )).find(res => !res.success);
    if (generateTeamsError) return generateTeamsError;

    await GenerateStats(eventId, false);

    return redirect("/" + eventId);
}