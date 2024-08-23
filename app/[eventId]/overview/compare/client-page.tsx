'use client'

import {Team, TeamEntry} from "@prisma/client";
import Back from "@/components/back";
import React from "react";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Edit, MoreVertical, ScanEye} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import ThreatGrade from "@/components/threat-grade";
import {ThreatGradeType} from "@/lib/database/set-threat-grade";
import StatusBadge from "@/components/status-badge";
import {TeamStatus} from "@/lib/database/set-team-statues";
import RichTextarea from "@/components/rich-textarea";
import QuickTooltip from "@/components/quick-tooltip";
import {epaValue} from "@/app/[eventId]/overview/[teamNumber]/client-page";

export default function ClientPage({eventId, a, b}: {
    eventId: number,
    a: {
        team: Team,
        entry: TeamEntry
        matches: { count: number }
    },
    b: {
        team: Team,
        entry: TeamEntry
        matches: { count: number }
    }
}) {
    function teamHeader(teamData: typeof a | typeof b) {
        return (
              <div>
                  <div className={"flex justify-between items-center gap-1"}>
                      <div>
                          <h1>{teamData.entry.name}</h1>
                          <p className={"muted"}>Team {teamData.team.number}</p>
                      </div>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size={"icon"} className={"mx-2"}>
                                  <MoreVertical/>
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={"end"}>
                              <a href={`/${eventId}/${teamData.team.number}`}>
                                  <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4"/>
                                      Make Changes
                                  </DropdownMenuItem>
                              </a>
                              <a href={`/${eventId}/overview/${teamData.team.number}`}>
                                  <DropdownMenuItem>
                                      <ScanEye className="mr-2 h-4 w-4"/>
                                      View Overview
                                  </DropdownMenuItem>
                              </a>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
                  <Separator/>
              </div>
        );
    }

    function teamData(teamData: typeof a | typeof b) {
        return (
              <div className={"mt-sm flex flex-wrap gap-6 h-min"}>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Team Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Region</p>
                              <p>{teamData.team.state}</p>
                          </div>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>School</p>
                              <p className={"w-48 overflow-x-scroll text-nowrap text-right"}>
                                  {teamData.team.school?.replace("&", "and")}
                              </p>
                          </div>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Rookie year</p>
                              <p>{teamData.team.rookieYear}</p>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-fit"}>
                      <CardHeader>
                          <CardTitle>Threat Grade</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-start sm:justify-center"}>
                          <ThreatGrade grade={teamData.entry.threatGrade as ThreatGradeType} size={"large"}/>
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Current Status</p>
                              <StatusBadge status={teamData.entry.status as TeamStatus}/>
                          </div>
                      </CardContent>
                  </Card>
                  {
                        teamData.entry.notes != "[{\"children\":[{\"text\":\"\"}],\"type\":\"p\"}]" && (
                              <Card className={"w-full sm:w-[45em]"}>
                                  <CardHeader>
                                      <CardTitle>Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <RichTextarea
                                            initialValue={JSON.parse(teamData.entry.notes)}
                                            readOnly
                                      />
                                  </CardContent>
                              </Card>
                        )
                  }
              </div>
        );
    }

    function statistics(teamData: typeof a | typeof b) {
        return (
              <div className={"mt-sm"}>
                  <h2>Statistics</h2>
                  {teamData.matches.count == 0 ? (
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
                                        <p>{teamData.entry.wins}</p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Losses</p>
                                        <p>{teamData.entry.losses}</p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Total</p>
                                        <p>{(teamData.entry.wins ?? 0) + (teamData.entry.ties ?? 0) + (teamData.entry.losses ?? 0)}</p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Win rate</p>
                                        <p>
                                            <QuickTooltip
                                                  trigger={
                                                      <>
                                                          {((teamData.entry.wins ?? 0) / ((teamData.entry.wins ?? 0) + (teamData.entry.losses ?? 0)) * 100).toFixed()}
                                                          <span className={"muted"}> of 100</span>
                                                      </>
                                                  }
                                                  content={`Theoretically would win ${
                                                        ((teamData.entry.wins ?? 0) / ((teamData.entry.wins ?? 0) + (teamData.entry.losses ?? 0)) * 100).toFixed()
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
                                        <p>{teamData.entry.worldRank} <span
                                              className={"muted"}>of {teamData.entry.worldTotal}</span>
                                        </p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Country</p>
                                        <p>{teamData.entry.countyRank} <span
                                              className={"muted"}>of {teamData.entry.countyTotal}</span></p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>District</p>
                                        <p>{teamData.entry.districtRank} <span
                                              className={"muted"}>of {teamData.entry.districtTotal}</span></p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Event</p>
                                        <p>{teamData.entry.eventRank} <span
                                              className={"muted"}>of {teamData.entry.eventTotal}</span>
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
                                        {epaValue(teamData.entry.autoEPA ?? 0, teamData.entry.autoDeviation ?? 0)}
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Teleop</p>
                                        {epaValue(teamData.entry.teleopEPA ?? 0, teamData.entry.teleopDeviation ?? 0)}
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Endgame</p>
                                        {epaValue(teamData.entry.endgameEPA ?? 0, teamData.entry.endgameDeviation ?? 0)}
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Total</p>
                                        {epaValue(teamData.entry.totalEPA ?? 0, teamData.entry.totalDeviation ?? 0)}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                  )}
              </div>
        );
    }

    return (
          <>
              <Back link={`/${eventId}/overview`} display={"Event Overview"}/>
              <div className={"lg:hidden"}>
                  {teamHeader(a)}
                  {teamData(a)}
                  <div className={"mt"}>
                      {teamHeader(b)}
                  </div>
                  {statistics(b)}
                  {teamData(b)}
                  {statistics(a)}
              </div>
              <div className={"hidden lg:block"}>
                  <div className={"grid grid-cols-2 gap-8"}>
                      {teamHeader(a)}
                      {teamHeader(b)}
                  </div>
                  <div className={"grid grid-cols-2 gap-8"}>
                      {teamData(a)}
                      {teamData(b)}
                  </div>
                  <div className={"grid grid-cols-2 gap-8"}>
                      {statistics(a)}
                      {statistics(b)}
                  </div>
              </div>
          </>
    );
}