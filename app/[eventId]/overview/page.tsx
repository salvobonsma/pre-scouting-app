import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Separator} from "@/components/ui/separator";
import Back from "@/components/back";
import React from "react";
import OverviewCharts from "@/app/[eventId]/overview/overview-charts";
import ScoutingCharts from "@/app/[eventId]/overview/scouting-charts";
import Teams from "@/app/[eventId]/overview/teams";
import ExportDialog from "@/app/[eventId]/overview/export-dialog";

export default async function Overview({params}: { params: { eventId: string } }) {
    if (!+params.eventId) return NotFound();

    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.eventId
              }
          }
    );
    if (!event) return NotFound();

    const teamEntries = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: event.id
              }
          }
    );

    const matchEntries = await prisma.matchEntry.findMany(
          {
              where: {
                  eventId: event.id,
                  record: true
              }
          }
    );
    const matches = await Promise.all(matchEntries.map(async value => ({
        ...value,
        teamNumber: (await prisma.teamEntry.findUnique(
              {
                  where: {
                      id: value.teamEntryId ?? undefined
                  }
              }
        ))?.teamNumber ?? 0
    })));

    return (
          <>
              <Back link={`/${event.id}`} display={"Event"}/>
              <div className={"flex justify-between items-center gap-2"}>
                  <h1>Event Overview</h1>
                  <ExportDialog eventId={event.id}/>
              </div>
              <Separator/>
              <OverviewCharts teamEntries={teamEntries}/>
              <h1 className={"mt"}>Scouting Overview</h1>
              <Separator/>
              <ScoutingCharts matches={matches} forTeam={false}/>
              <h1 className={"mt"} id={"teams"}>Team Overviews</h1>
              <Separator/>
              <Teams eventId={event.id} data={teamEntries}/>
          </>
    )
}