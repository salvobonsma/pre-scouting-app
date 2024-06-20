'use client'

import Back from "@/components/back";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import SetTeamStatues, {TeamStatus} from "@/lib/database/set-team-statues";
import React, {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {CarouselApi} from "@/components/ui/carousel";
import ThreatGradeContainer from "@/components/threat-grade-container";

export default function ClientPage({event, team, teamEntry}: {
    event: { id: number },
    team: { rookieYear: number | null, state: string | null, school: string | null, number: number },
    teamEntry: { teamNumber: number | null, name: string | null, status: string, threatGrade: string }
}) {
    const [status, setStatus] = useState(teamEntry.status as TeamStatus);
    const [carousel, setCarousel] = React.useState<CarouselApi>();

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
                              <p className={"w-48 overflow-scroll text-nowrap text-right"}>
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
          </>
    )
}