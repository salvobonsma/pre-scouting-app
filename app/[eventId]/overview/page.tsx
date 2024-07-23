import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Back from "@/components/back";
import React from "react";
import OverviewCharts from "@/app/[eventId]/overview/overview-charts";
import ScoutingCharts from "@/app/[eventId]/overview/scouting-charts";
import OverviewByTeam from "@/app/[eventId]/overview/overview-by-team";

export default async function Overview({params}: { params: { id: string } }) {
    if (!+params.id) return NotFound();

    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.id
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
                  <Button className={"m-1.5"}>Export</Button>
              </div>
              <Separator/>
              <OverviewCharts teamEntries={teamEntries}/>
              <h1 className={"mt"}>Scouting</h1>
              <Separator/>
              <ScoutingCharts matches={matches}/>
              <h1 className={"mt"}>Overview by Team</h1>
              <Separator/>
              <OverviewByTeam/>
          </>
    )
}