'use server'

import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import React from "react";
import ClientPage from "@/app/[eventId]/overview/compare/client-page";
import {TeamDropdown} from "@/app/[eventId]/overview/compare/team-dropdown";
import Back from "@/components/back";

export default async function Compare({params, searchParams}: {
    params: { eventId: string }
    searchParams: { a?: string, b?: string }
}) {
    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.eventId
              }
          }
    );
    if (!event) return <NotFound/>;

    const eventTeams = await Promise.all(
          (await prisma.teamEntry.findMany(
                {
                    where: {
                        eventId: event.id
                    }
                }
          )).map(async value => (await prisma.team.findMany(
                {
                    where: {
                        number: value.teamNumber ?? undefined
                    }
                }
          ))[0])
    );

    function teamSelector(a: string | undefined, b: string | undefined) {
        if (!event) return;

        return (
              <>
                  <Back link={`/${event.id}/overview`} display={"Event Overview"}/>
                  <div className={"flex flex-col md:flex-row justify-center gap-3 md:gap-10 items-center"}>
                      <TeamDropdown eventId={event.id} teams={eventTeams} a={a} b={b} side={"a"}/>
                      <p className={"muted"}>vs</p>
                      <TeamDropdown eventId={event.id} teams={eventTeams} a={a} b={b} side={"b"}/>
                  </div>
              </>
        );
    }

    if (!searchParams.a || !searchParams.b) {
        return (
              <>
                  {teamSelector(searchParams.a, searchParams.b)}
                  <p className={"text-center muted mt-8"}>
                      Select two teams to continue.
                  </p>
              </>
        );
    }

    const a = await prisma.team.findUnique(
          {
              where: {
                  number: +searchParams.a
              }
          }
    );
    const b = await prisma.team.findUnique(
          {
              where: {
                  number: +searchParams.b
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

    const aPastSeasons = (await prisma.teamPastSeason.findMany(
          {
              where: {
                  teamNumber: a.number,
                  year: {
                      lt: event.year
                  }
              }
          }
    )).map(value => ({
        year: value.year,
        winRate: value.winrate,
        rank: {
            rank: value.rank,
            of: value.totalTeams
        },
        epa: {
            epa: value.epa,
            percentile: value.percentile
        }
    })).sort((a, b) => b.year - a.year);
    const bPastSeasons = (await prisma.teamPastSeason.findMany(
          {
              where: {
                  teamNumber: b.number,
                  year: {
                      lt: event.year
                  }
              }
          }
    )).map(value => ({
        year: value.year,
        winRate: value.winrate,
        rank: {
            rank: value.rank,
            of: value.totalTeams
        },
        epa: {
            epa: value.epa,
            percentile: value.percentile
        }
    })).sort((a, b) => b.year - a.year);

    return (
          <>
              {teamSelector(searchParams.a, searchParams.b)}
              <ClientPage
                    eventId={+params.eventId}
                    a={{
                        team: a,
                        entry: aEntry[0],
                        matches: aMatches,
                        events: aEvents,
                        previousYears: aPastSeasons
                    }}
                    b={{
                        team: b,
                        entry: bEntry[0],
                        matches: bMatches,
                        events: bEvents,
                        previousYears: bPastSeasons
                    }}
              />
          </>
    );
}