'use client'

import Back from "@/components/back";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import SetTeamStatues, {TeamStatus} from "@/lib/database/set-team-statues";
import React, {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import ThreatGradeContainer from "@/components/threat-grade-container";
import {ArrowDown, ArrowUp, Minus} from "lucide-react";
import {percentile, withOrdinalSuffix} from "@/lib/utils";
import QuickTooltip from "@/components/quick-tooltip";

export default function ClientPage({event, team, teamEntry, matchEntries}: {
    event: { id: number },
    team: { rookieYear: number | null, state: string | null, school: string | null, number: number },
    teamEntry: {
        teamNumber: number | null,
        name: string | null,
        status: string,
        threatGrade: string | null,
        wins: number | null,
        ties: number | null,
        losses: number | null,
        worldRank: number | null
        worldTotal: number
        countyRank: number | null
        countyTotal: number
        districtRank: number | null
        districtTotal: number
        eventRank: number | null,
        eventTotal: number
        autoEPA: number | null,
        teleopEPA: number | null,
        endgameEPA: number | null,
        totalEPA: number | null,
        autoDeviation: number | null,
        teleopDeviation: number | null,
        endgameDeviation: number | null,
        totalDeviation: number | null
    },
    matchEntries: {}[]
}) {
    const [status, setStatus] = useState(teamEntry.status as TeamStatus);

    async function setTeamStatus(status: TeamStatus) {
        setStatus(status);
        await SetTeamStatues(event.id, [team.number], status);
    }

    return (
          <>
              <Back link={`/${event.id}`} display={"Event"}/>
              <h1>{teamEntry.name}</h1>
              <p className={"muted"}>Team {teamEntry.teamNumber}</p>
              <Separator/>
              <div className={"mt-sm flex flex-wrap gap-6"}>
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
                  <Card className={"w-full sm:w-fit"}>
                      <CardHeader>
                          <CardTitle><QuickTooltip trigger={"Threat Grade"} content={"Placeholder"}/></CardTitle>
                      </CardHeader>
                      <CardContent className={"flex gap-4"}>
                          <ThreatGradeContainer event={event} team={team} teamEntry={teamEntry}/>
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Current Status</p>
                              <StatusBadge status={status}/>
                          </div>
                          <div className={"mt-4 flex justify-end"}>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button>Update Status</Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent side={"right"} align={"end"}>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => setTeamStatus("notStarted")}
                                      >
                                          <StatusBadge status={"notStarted"}/>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => setTeamStatus("inProgress")}
                                      >
                                          <StatusBadge status={"inProgress"}/>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                            className={"justify-center"}
                                            onClick={() => setTeamStatus("completed")}
                                      >
                                          <StatusBadge status={"completed"}/>
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </div>
                      </CardContent>
                  </Card>
              </div>
              <h1 className={"mt"}>Statistics</h1>
              <Separator/>
              {matchEntries.length == 0 ? (
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
                                    <p>{teamEntry.worldRank} <span className={"muted"}>of {teamEntry.worldTotal}</span>
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
                                    <p>{teamEntry.eventRank} <span className={"muted"}>of {teamEntry.eventTotal}</span>
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
              <h1 className={"mt"}>Events</h1>
              <Separator/>
              <h1 className={"mt"}>Notes</h1>
              <Separator/>
              <h1 className={"mt"}>Matches</h1>
              <Separator/>
              <h1 className={"mt"}>Past Seasons</h1>
              <Separator/>
          </>
    );
}

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