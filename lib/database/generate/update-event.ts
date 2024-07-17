'use server'

import {ActionResult} from "@/lib/database/action-result";
import {tba} from "@/lib/tba/tba";
import prisma from "@/lib/prisma";
import GenerateTeam from "@/lib/database/generate/segments/generate-team";
import GenerateStats from "@/lib/database/generate/segments/generate-stats";

export default async function UpdateEvent(id: number): Promise<ActionResult> {
    const event = await prisma.event.findUnique(
          {
              where: {id: id}
          }
    );
    if (!event) return {success: false, message: "Event not found."}

    // Generate Teams
    const tbaTeams = (await tba.GET("/event/{event_key}/teams", {
        params: {
            path: {event_key: event.key},
        },
    }));
    if (!tbaTeams.data) {
        return {success: false, message: "TBA API request error (b): " + tbaTeams.response.status}
    }

    const generateTeamsError = (await Promise.all(
          tbaTeams.data.map((team) => GenerateTeam(team, id, event.year, tbaTeams.data.length, true))
    )).find(res => !res.success);
    if (generateTeamsError) return generateTeamsError;

    await GenerateStats(id, true);

    // Update updatedAt
    await prisma.event.update(
          {
              where: {id: id},
              data: {
                  updatedAt: new Date()
              }
          }
    );

    return {success: true};
}