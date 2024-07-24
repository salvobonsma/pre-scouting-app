import React from "react";
import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import ClientPage from "@/app/[eventId]/overview/[teamNumber]/client-page";

export default async function TeamOverview({params}: { params: { eventId: string, teamNumber: string } }) {
    if (!+params.eventId || !+params.teamNumber) return NotFound();

    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.eventId
              }
          }
    );
    if (!event) return NotFound();
    const team = await prisma.team.findUnique(
          {
              where: {
                  number: +params.teamNumber
              }
          }
    )
    const teamEntry = (await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: event.id,
                  teamNumber: +params.teamNumber
              }
          }
    ))[0];
    if (!team || !teamEntry) return NotFound();

    const events = await prisma.teamEvent.findMany(
          {
              where: {
                  teamNumber: team.number
              }
          }
    );

    const matchesEntries = await prisma.matchEntry.findMany({
        where: {
            teamEntryId: teamEntry.id
        }
    });

    const scoutedMatches = (await Promise.all(matchesEntries.map(async value => ({
        ...value,
        teamNumber: (await prisma.teamEntry.findUnique(
              {
                  where: {
                      id: value.teamEntryId ?? undefined
                  }
              }
        ))?.teamNumber ?? 0
    })))).filter(value => value.record);

    return (
          <ClientPage
                event={event}
                team={team}
                teamEntry={teamEntry}
                matches={matchesEntries}
                scoutedMatches={scoutedMatches}
                events={events}
          />
    );
}