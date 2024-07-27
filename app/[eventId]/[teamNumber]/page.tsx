import NotFound from "@/app/not-found";
import prisma from "@/lib/prisma";
import ClientPage from "@/app/[eventId]/[teamNumber]/client-page";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import QuickTooltip from "@/components/quick-tooltip";
import {ArrowDown, ArrowUp, Minus} from "lucide-react";
import {percentile, withOrdinalSuffix} from "@/lib/utils";
import EventCard from "@/app/[eventId]/[teamNumber]/event-card";
import PastSeasons, {columns} from "@/app/[eventId]/[teamNumber]/past-seasons";
import {MatchStatus} from "@/lib/database/set-match-statuses";

export default async function Team({params}: { params: { eventId: string, teamNumber: string } }) {
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

    const matchEntries = await prisma.matchEntry.findMany({
        where: {
            teamEntryId: teamEntry.id
        }
    });

    const matches = await Promise.all(matchEntries.map(async (value) => {
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
    })).sort((a, b) => b.year - a.year)

    function epaValue(epa: number, deviation: number) {
        let arrow;
        let placement;
        if (deviation > 0.2) {
            arrow = (<ArrowUp className={"w-5 h-5 self-center"}/>);
            placement = "Above";
        } else if (deviation > -0.2) {
            arrow = (<Minus className={"w-5 h-5 self-center"}/>);
            placement = "Around";
        } else {
            arrow = (<ArrowDown className={"w-5 h-5 self-center"}/>);
            placement = "Below";
        }

        return (
              <QuickTooltip
                    trigger={
                        <div className={"flex gap-0.5"}>
                            <p>{epa.toFixed(1)}</p>
                            {arrow}
                        </div>
                    }
                    content={`${placement} average; ${withOrdinalSuffix((percentile(deviation) * 100))} percentile`}
              />
        );
    }

    const eventsFiltered = events
          .filter(value => value.eventKey != event.key)
          .sort((a, b) =>
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
          .map(value => (
                <EventCard key={value.eventKey} event={value}/>
          ));

    return (
          <ClientPage
                event={event}
                team={team}
                teamEntry={teamEntry}
                teamDetails={
                    <Card className={"w-full sm:w-80"}>
                        <CardHeader>
                            <CardTitle>Team Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>Region</p>
                                <p>{team.state}</p>
                            </div>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>School</p>
                                <p className={"w-48 overflow-x-scroll text-nowrap text-right"}>
                                    {team.school?.replace("&", "and")}
                                </p>
                            </div>
                            <div className={"flex justify-between"}>
                                <p className={"muted"}>Rookie year</p>
                                <p>{team.rookieYear}</p>
                            </div>
                        </CardContent>
                    </Card>
                }
                statistics={matches.length == 0 ? (
                      <p className={"text-center muted mt-8"}>
                          This team has not competed in any matches this season, yet.
                      </p>
                ) : (
                      <div className={"mt-sm flex flex-wrap gap-6"}>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle>Record</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Wins</p>
                                      <p>{teamEntry.wins}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Losses</p>
                                      <p>{teamEntry.losses}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Total</p>
                                      <p>{(teamEntry.wins ?? 0) + (teamEntry.ties ?? 0) + (teamEntry.losses ?? 0)}</p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Win rate</p>
                                      <p>
                                          <QuickTooltip
                                                trigger={
                                                    <>
                                                        {((teamEntry.wins ?? 0) / ((teamEntry.wins ?? 0) + (teamEntry.losses ?? 0)) * 100).toFixed()}
                                                        <span className={"muted"}> of 100</span>
                                                    </>
                                                }
                                                content={`Theoretically would win ${
                                                      ((teamEntry.wins ?? 0) / ((teamEntry.wins ?? 0) + (teamEntry.losses ?? 0)) * 100).toFixed()
                                                } out of 100 matches if put up against the same opponents`}
                                          />
                                      </p>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle><QuickTooltip trigger={"Rank"} content={"Based on EPA"}/></CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>World</p>
                                      <p>{teamEntry.worldRank} <span
                                            className={"muted"}>of {teamEntry.worldTotal}</span>
                                      </p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Country</p>
                                      <p>{teamEntry.countyRank} <span
                                            className={"muted"}>of {teamEntry.countyTotal}</span></p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>District</p>
                                      <p>{teamEntry.districtRank} <span
                                            className={"muted"}>of {teamEntry.districtTotal}</span></p>
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Event</p>
                                      <p>{teamEntry.eventRank} <span
                                            className={"muted"}>of {teamEntry.eventTotal}</span>
                                      </p>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-60"}>
                              <CardHeader>
                                  <CardTitle><QuickTooltip trigger={"EPA"} content={
                                      <a className={"hover:underline"} href={"https://www.statbotics.io"}
                                         target={"_blank"}>Expected Points Added</a>
                                  }/></CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Auto</p>
                                      {epaValue(teamEntry.autoEPA ?? 0, teamEntry.autoDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Teleop</p>
                                      {epaValue(teamEntry.teleopEPA ?? 0, teamEntry.teleopDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Endgame</p>
                                      {epaValue(teamEntry.endgameEPA ?? 0, teamEntry.endgameDeviation ?? 0)}
                                  </div>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Total</p>
                                      {epaValue(teamEntry.totalEPA ?? 0, teamEntry.totalDeviation ?? 0)}
                                  </div>
                              </CardContent>
                          </Card>
                      </div>
                )}
                events={
                    events.length == 0 ? (
                          <p className={"text-center muted mt-8"}>
                              This team has not competed at any events this season, yet.
                          </p>
                    ) : (
                          eventsFiltered.length == 0 ? (
                                <p className={"text-center muted mt-8"}>
                                    This team has not competed at any events, other than this one, this season.
                                </p>
                          ) : (
                                <div className={"mt-sm flex flex-wrap gap-6"}>
                                    {eventsFiltered}
                                </div>
                          )
                    )
                }
                matches={matches.map(value => ({
                    ...value,
                    compLevel: value.compLevel as "qm" | "ef" | "qf" | "sf" | "f",
                    winningAlliance: value.winningAlliance as "red" | "blue" | "",
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
                pastSeasons={
                    <>
                        <div className={"mt-sm"}>
                            <PastSeasons columns={columns} data={pastSeasons}/>
                        </div>
                    </>
                }
          />
    );
}