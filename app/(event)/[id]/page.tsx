import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import EventDetails from "@/components/event-details";
import Hgroup from "@/components/ui/hgroup";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Event({params}: { params: { id: string } }) {
    if (!+params.id) return NotFound();

    const eventData = await prisma.event.findUnique(
          {
              where: {
                  id: +params.id
              }
          }
    );
    const teamData = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.id
              }
          }
    );

    let progress = teamData.map(value => +(value.progress == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    ) / teamData.length * 100;
    progress = isNaN(progress) ? 0 : progress;
    const notStarted = teamData.map(value => +(value.progress == "notStarted" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const inProgress = teamData.map(value => +(value.progress == "inProgress" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const completed = teamData.map(value => +(value.progress == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );

    if (!eventData || !teamData) return NotFound();

    return (
          <>
              <Hgroup h={eventData.name} p={eventData.eventName}/>
              <div className={"mt flex flex-wrap gap-6"}>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader>
                          <CardTitle>Event Details</CardTitle>
                      </CardHeader>
                      <CardContent><EventDetails event={eventData} teams={teamData.length}/></CardContent>
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
                                      <Badge variant={"destructive"}>Not started</Badge>
                                      <p>{notStarted}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge variant={"secondary"}>In progress</Badge>
                                      <p>{inProgress}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge variant={"default"}>Completed</Badge>
                                      <p>{completed}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge variant={"outline"}>Total</Badge>
                                      <p>{teamData.length}</p>
                                  </div>
                              </div>
                          </div>
                          <div className={"block sm:hidden"}>{/*Hidden and flex not compatible*/}
                              <div className={"flex justify-around my-4 gap-4 text-center flex-wrap"}>
                                  <div className={"flex gap-2"}>
                                      <Badge variant={"destructive"}>Not started</Badge>
                                      <p>{notStarted}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge variant={"secondary"}>In progress</Badge>
                                      <p>{inProgress}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge variant={"default"}>Completed</Badge>
                                      <p>{completed}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge variant={"outline"}>Total</Badge>
                                      <p>{teamData.length}</p>
                                  </div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-80"}>
                      <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                      <CardContent>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Greatest threat level</p>
                              <p>9442</p>
                          </div>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Average EPA</p>
                              <p>10.2 points</p>
                          </div>
                      </CardContent>
                      <CardFooter className={"flex justify-end"}>
                          <Link href={`/${params.id}/overview`}><Button>View Full Overview</Button></Link>
                      </CardFooter>
                  </Card>
              </div>

              <h1 className={"mt"}>Teams</h1>
              <Separator/>
          </>
    )
}