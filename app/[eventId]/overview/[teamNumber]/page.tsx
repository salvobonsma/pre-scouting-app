import React from "react";
import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import ClientPage from "@/app/[eventId]/overview/[teamNumber]/client-page";
import {MatchStatus} from "@/lib/database/set-match-statuses";
import PreviousSeasons, {columns} from "@/components/previous-seasons";

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

    const matches = await Promise.all(matchesEntries.map(async (value) => {
        const match = (await prisma.match.findMany({
            where: {
                key: value.matchKey == null ? undefined : value.matchKey
            }
        }))[0];

        return {
            ...value,
            ...match,
            teamEntryId: teamEntry.id
        };
    }));

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

    const pastSeasons = (await prisma.teamPastSeason.findMany(
          {
              where: {
                  teamNumber: team.number,
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
          <ClientPage
                event={event}
                team={team}
                teamEntry={teamEntry}
                matches={matches.map(value => ({
                    ...value,
                    compLevel: value.compLevel as "qm" | "ef" | "qf" | "sf" | "f",
                    winningAlliance: value.winningAlliance as "red" | "blue" | "",
                    pickupFrom: value.pickupFrom as ("source" | "ground")[],
                    finalStatus: value.finalStatus as "parked" | "onstage" | "attemptedAndFailed" | "notAttempted",
                    driverSkill: value.driverSkill as "effective" | "average" | "notEffective",
                    defenceSkill: value.defenceSkill as "effective" | "average" | "notEffective",
                    speed: value.speed as "fast" | "average" | "slow",
                    status: value.status as MatchStatus
                })).map(value => {
                    const friendlyAlliance = value.redTeamKeys.filter(key => key.includes(team.number.toString())).length > 0;
                    return {
                        ...value,
                        friendlyAlliance: friendlyAlliance,
                        friendlyScore: friendlyAlliance ? value.redScore : value.blueScore,
                        opponentScore: friendlyAlliance ? value.blueScore : value.redScore,
                    }
                })}
                matchEntries={matchesEntries}
                scoutedMatches={scoutedMatches}
                events={events}
                previousSeasons={
                    <div className={"mt-sm"}>
                        <PreviousSeasons columns={columns} data={pastSeasons}/>
                    </div>
                }
          />
    );
}