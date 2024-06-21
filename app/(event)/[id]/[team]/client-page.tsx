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

export default function ClientPage({event, team, teamEntry, matchEntries}: {
    event: { id: number },
    team: { rookieYear: number | null, state: string | null, school: string | null, number: number },
    teamEntry: { teamNumber: number | null, name: string | null, status: string, threatGrade: string },
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
                          <CardTitle>Threat Grade</CardTitle>
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
                                    <p>152</p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Losses</p>
                                    <p>132</p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Total</p>
                                    <p>11</p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Win rate</p>
                                    <p>57 <span className={"muted"}> out of 100</span></p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={"w-full sm:w-60"}>
                            <CardHeader>
                                <CardTitle>Rank</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>World</p>
                                    <p>152 <span className={"muted"}>of 3474</span></p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Country</p>
                                    <p>132 <span className={"muted"}>of 2806</span></p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>District</p>
                                    <p>11 <span className={"muted"}>of 127</span></p>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Event</p>
                                    <p>3 <span className={"muted"}>of 46</span></p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={"w-full sm:w-60"}>
                            <CardHeader>
                                <CardTitle>EPA Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Auto</p>
                                    <div className={"flex gap-0.5"}>
                                        <p>11.7</p>
                                        <Minus className={"w-5 h-5 self-center"}/>
                                    </div>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Teleop</p>
                                    <div className={"flex gap-0.5"}>
                                        <p>23.3</p>
                                        <ArrowDown className={"w-5 h-5 self-center"}/>
                                    </div>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Endgame</p>
                                    <div className={"flex gap-0.5"}>
                                        <p>1.2</p>
                                        <ArrowUp className={"w-5 h-5 self-center"}/>
                                    </div>
                                </div>
                                <div className={"flex justify-between"}>
                                    <p className={"muted"}>Total</p>
                                    <div className={"flex gap-0.5"}>
                                        <p>36.3</p>
                                        <ArrowUp className={"w-5 h-5 self-center"}/>
                                    </div>
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