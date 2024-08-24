'use server'

import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import React from "react";
import ClientPage from "@/app/[eventId]/overview/compare/client-page";

export default async function Compare({params, searchParams}: {
    params: { eventId: string }
    searchParams: { a?: string, b?: string }
}) {
    const a = await prisma.team.findUnique(
          {
              where: {
                  number: +(searchParams.a ?? -1)
              }
          }
    );
    const b = await prisma.team.findUnique(
          {
              where: {
                  number: +(searchParams.b ?? -1)
              }
          }
    );
    if (!a || !b) return <NotFound/>;

    const aEntry = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.eventId,
                  teamNumber: a.number
              }
          }
    );
    const bEntry = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.eventId,
                  teamNumber: b.number
              }
          }
    );
    if (!aEntry || !bEntry) return <NotFound/>;

    const aMatches = await Promise.all(
          (await prisma.matchEntry.findMany({
              where: {
                  eventId: aEntry[0].eventId,
                  teamEntryId: aEntry[0].id,
              },
          })).map(async (value) => {
              const match = await prisma.match.findUnique({
                  where: {
                      key: value.matchKey ?? undefined,
                  },
              });
              return {
                  ...value,
                  ...(match ?? {}), // Safely spread the match object if it exists, otherwise spread an empty object
              };
          })
    );
    const bMatches = await Promise.all(
          (await prisma.matchEntry.findMany({
              where: {
                  eventId: bEntry[0].eventId,
                  teamEntryId: bEntry[0].id,
              },
          })).map(async (value) => {
              const match = await prisma.match.findUnique({
                  where: {
                      key: value.matchKey ?? undefined,
                  },
              });
              return {
                  ...value,
                  ...(match ?? {}), // Safely spread the match object if it exists, otherwise spread an empty object
              };
          })
    );

    const aEvents = await prisma.teamEvent.findMany(
          {
              where: {
                  teamNumber: a.number
              }
          }
    );
    const bEvents = await prisma.teamEvent.findMany(
          {
              where: {
                  teamNumber: b.number
              }
          }
    );

    console.log(JSON.stringify(aMatches))

    return (
          <ClientPage
                eventId={+params.eventId}
                a={{
                    team: a,
                    entry: aEntry[0],
                    matches: aMatches,
                    events: aEvents
                }}
                b={{
                    team: b,
                    entry: bEntry[0],
                    matches: bMatches,
                    events: bEvents
                }}
          />
    );
}