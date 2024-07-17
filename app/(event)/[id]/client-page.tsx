'use client'

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import StatusBadge from "@/components/status-badge";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import TeamsTable from "@/app/(event)/[id]/teams-table";
import {TeamStatus} from "@/lib/database/set-team-statues";
import {isPast} from "@/lib/utils";
import {ReactNode, useState} from "react";
import Back from "@/components/back";
import {Button} from "@/components/ui/button";

export default function ClientPage({event, teams, eventDetails, overview}: {
    event: { id: number, name: string, eventName: string, startDate: string },
    teams: { teamNumber: number | null, name: string | null, status: string }[],
    eventDetails: ReactNode,
    overview: ReactNode
}) {
    const [statusStates, setStatusStates] = useState(
          teams.map(team => ({teamNumber: team.teamNumber ?? 0, status: team.status as TeamStatus}))
    );

    let progress = statusStates.map(value => +(value.status == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    ) / teams.length * 100;
    progress = isNaN(progress) ? 0 : progress;
    const notStarted = statusStates.map(value => +(value.status == "notStarted" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const inProgress = statusStates.map(value => +(value.status == "inProgress" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const completed = statusStates.map(value => +(value.status == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );

    return (
          <>
              <Back link={"/"} display={"Events"}/>
              <h1>{event.name}</h1>
              <p className={"muted"}>{event.eventName}</p>
              <Separator/>
              <div className={"mt-sm flex flex-wrap gap-6"}>
                  {eventDetails}
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Update</CardTitle>
                      </CardHeader>
                      <CardContent className={"sm:h-20"}>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Last update</p>
                              <p>2 days ago</p>
                          </div>
                      </CardContent>
                      <CardFooter className={"flex justify-end"}>
                          <Button>Update Event Data</Button>
                      </CardFooter>
                  </Card>
                  <Card className={"w-full sm:w-fit max-w-[32em]"}>
                      <CardHeader><CardTitle>Progress</CardTitle></CardHeader>
                      <CardContent>
                          <div className={"flex items-center gap-3 m-4 mt-0"}>
                              <Progress value={progress} className={"w-full"}/>
                              <p className={"font-semi-bold"}>{progress.toFixed(0)}%</p>
                          </div>
                          <div className={"hidden sm:block"}>{/*Hidden and flex not compatible*/}
                              <div className={"flex justify-between my-4 gap-1 h-16 text-center"}>
                                  <div className={"m-2"}>
                                      <StatusBadge status={"notStarted"}/>
                                      <p>{notStarted}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <StatusBadge status={"inProgress"}/>
                                      <p>{inProgress}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <StatusBadge status={"completed"}/>
                                      <p>{completed}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge variant={"outline"}>Total</Badge>
                                      <p>{teams.length}</p>
                                  </div>
                              </div>
                          </div>
                          <div className={"block sm:hidden"}>{/*Hidden and flex not compatible*/}
                              <div className={"flex justify-around my-4 gap-4 text-center flex-wrap"}>
                                  <div className={"flex gap-2"}>
                                      <StatusBadge status={"notStarted"}/>
                                      <p>{notStarted}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <StatusBadge status={"inProgress"}/>
                                      <p>{inProgress}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <StatusBadge status={"completed"}/>
                                      <p>{completed}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge variant={"outline"}>Total</Badge>
                                      <p>{teams.length}</p>
                                  </div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  {overview}
              </div>

              <h1 className={"mt"}>Teams</h1>
              <Separator/>
              {teams.length > 0 ? (
                    <div className={"mt-sm"}>
                        <TeamsTable
                              data={teams.map(team => ({
                                  teamNumber: team.teamNumber ?? 0,
                                  teamName: team.name ?? "",
                                  status: team.status as TeamStatus
                              }))}
                              eventId={event.id}
                              statusStates={statusStates}
                              setStatusStates={setStatusStates}
                        />
                    </div>
              ) : (
                    <p className={"text-center muted mt-8"}>
                        No teams {isPast(event.startDate) ? "are attending" : "have attended"} this event
                        {isPast(event.startDate) ? ", yet" : ""}.
                    </p>
              )}
          </>
    )
}