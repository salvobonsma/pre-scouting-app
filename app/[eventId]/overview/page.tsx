import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Back from "@/components/back";
import React from "react";
import OverviewCharts from "@/app/[eventId]/overview/overview-charts";
import ScoutingCharts from "@/app/[eventId]/overview/scouting-charts";
import Teams from "@/app/[eventId]/overview/teams";
import {ArrowLeftRight} from "lucide-react";

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
                  <Button className={"m-1.5"} disabled>Export</Button>
              </div>
              <Separator/>
              <OverviewCharts teamEntries={teamEntries}/>
              <h1 className={"mt"}>Scouting Overview</h1>
              <Separator/>
              <ScoutingCharts matches={matches} forTeam={false}/>
              <div className={"mt flex justify-between items-center gap-2"}>
                  <h1 id={"teams"}>Team Overviews</h1>
                  <a href={`/${event.id}/overview/compare`}>
                      <Button><ArrowLeftRight className="mr-2 h-4 w-4"/>Compare Teams</Button>
                  </a>
              </div>
              <Separator/>
              <Teams eventId={event.id} data={teamEntries}/>
          </>
    )
}