import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";

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

    const progress = teamData.map(value => +(value.progress == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    ) / teamData.length * 100;
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
              <div className={"flex flex-wrap mt-4"}>
                  {/*event details:
                  time till event
                  num teams attending
                  location
                  district


                  */}
                  <Card className={"w-full sm:w-fit max-w-[6in]"}>
                      <CardHeader><CardTitle>Progress</CardTitle></CardHeader>
                      <CardContent>
                          <div className={"flex items-center gap-3 m-4 mt-0"}>
                              <Progress value={progress} className={"w-full"}/>
                              <p className={"font-semi-bold"}>{progress.toFixed(0)}%</p>
                          </div>
                          <div className={"hidden sm:block"}>{/*Hidden and flex not compatible*/}
                              <div className={"flex justify-between my-4 gap-1 h-16 text-center"}>
                                  <div className={"m-2"}>
                                      <Badge>Not started</Badge>
                                      <p>{notStarted}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge>In progress</Badge>
                                      <p>{inProgress}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge>Completed</Badge>
                                      <p>{completed}</p>
                                  </div>
                                  <Separator orientation={"vertical"}/>
                                  <div className={"m-2"}>
                                      <Badge>Total</Badge>
                                      <p>{teamData.length}</p>
                                  </div>
                              </div>
                          </div>
                          <div className={"block sm:hidden"}>{/*Hidden and flex not compatible*/}
                              <div className={"flex justify-around my-4 gap-4 text-center flex-wrap"}>
                                  <div className={"flex gap-2"}>
                                      <Badge>Not started</Badge>
                                      <p>{notStarted}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge>In progress</Badge>
                                      <p>{inProgress}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge>Completed</Badge>
                                      <p>{completed}</p>
                                  </div>
                                  <div className={"flex gap-2"}>
                                      <Badge>Total</Badge>
                                      <p>{teamData.length}</p>
                                  </div>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </>
    )
}