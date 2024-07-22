import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Back from "@/components/back";
import React from "react";
import OverviewCharts from "@/app/(event)/[id]/overview/overview-charts";

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

    return (
          <>
              <Back link={`/${event.id}`} display={"Event"}/>
              <div className={"flex justify-between items-center gap-2"}>
                  <h1>Event Overview</h1>
                  <Button className={"m-1.5"}>Export</Button>
              </div>
              <Separator/>
              <OverviewCharts teamEntries={teamEntries}/>
              <h1 className={"mt"}>Team Abilities</h1>
              <Separator/>
              <p className={"mt-sm muted text-center"}>
                  To view team abilities you must scout at least 5 matches.
              </p>
              <h1 className={"mt"}>Overview by Team</h1>
              <Separator/>
          </>
    )
}