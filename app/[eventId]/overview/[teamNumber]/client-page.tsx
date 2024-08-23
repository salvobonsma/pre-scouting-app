'use client'

import {Event, MatchEntry, Team, TeamEntry, TeamEvent} from "@prisma/client";
import Back from "@/components/back";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import QuickTooltip from "@/components/quick-tooltip";
import ThreatGrade from "@/components/threat-grade";
import {ThreatGradeType} from "@/lib/database/set-threat-grade";
import StatusBadge from "@/components/status-badge";
import {TeamStatus} from "@/lib/database/set-team-statues";
import RichTextarea from "@/components/rich-textarea";
import React, {ReactNode} from "react";
import {ArrowDown, ArrowUp, Edit, Minus, MoreVertical} from "lucide-react";
import {percentile, withOrdinalSuffix} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import EventCard from "@/app/[eventId]/[teamNumber]/event-card";
import ScoutingCharts from "@/app/[eventId]/overview/scouting-charts";
import Matches, {Match} from "@/app/[eventId]/overview/[teamNumber]/matches/matches";
import EPAOverTime from "@/components/epa-over-time";

export default function ClientPage({
                                       event,
                                       team,
                                       teamEntry,
                                       matches,
                                       matchEntries,
                                       scoutedMatches,
                                       events,
                                       previousSeasons
                                   }: {
    event: Event,
    team: Team,
    teamEntry: TeamEntry,
    matches: Match[],
    matchEntries: MatchEntry[],
    scoutedMatches: (MatchEntry & { teamNumber: number })[],
    events: TeamEvent[]
    previousSeasons: ReactNode
}) {
    const eventsFiltered = events
          .filter(value => value.eventKey != event.key)
          .sort((a, b) =>
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
          .map(value => (
                <EventCard key={value.eventKey} event={value}/>
          ));

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

    return (
          <>
              <Back link={`/${event.id}/overview#teams`} display={"Event Overview"}/>
              <div className={"flex justify-between items-center gap-1"}>
                  <div>
                      <h1>{teamEntry.name}</h1>
                      <p className={"muted"}>Team {teamEntry.teamNumber}</p>
                  </div>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size={"icon"} className={"mx-2"}>
                              <MoreVertical/>
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={"end"}>
                          <a href={`/${event.id}/${team.number}`}>
                              <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4"/>
                                  Make Changes
                              </DropdownMenuItem>
                          </a>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
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
                      <CardContent className={"flex justify-start sm:justify-center"}>
                          <ThreatGrade grade={teamEntry.threatGrade as ThreatGradeType} size={"large"}/>
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Current Status</p>
                              <StatusBadge status={teamEntry.status as TeamStatus}/>
                          </div>
                      </CardContent>
                  </Card>
                  {
                        teamEntry.notes != "[{\"children\":[{\"text\":\"\"}],\"type\":\"p\"}]" && (
                              <Card className={"w-full sm:w-[45em]"}>
                                  <CardHeader>
                                      <CardTitle>Notes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <RichTextarea
                                            initialValue={JSON.parse(teamEntry.notes)}
                                            readOnly
                                      />
                                  </CardContent>
                              </Card>
                        )
                  }
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
              <EPAOverTime matches={matches} events={events}/>
              <h1 className={"mt"}>Events</h1>
              <Separator/>
              {
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
              <h1 className={"mt"}>Scouting Overview</h1>
              <Separator/>
              <ScoutingCharts matches={scoutedMatches} forTeam/>
              <Matches matches={matches}/>
              {previousSeasons}
          </>
    );
}