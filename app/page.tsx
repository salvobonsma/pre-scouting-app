import {Separator} from "@/components/ui/separator";
import NewEventDialog from "@/components/dialogs/new-event-dialog";
import prisma from "@/lib/prisma";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import EventDropdown from "@/app/event-dropdown";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import ApiUpdateDropdown from "@/app/api-update-dropdown";

export default async function Home() {
    const events = await prisma.event.findMany();
    events.sort((a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return (
          <div className={"mb-14"}>
              <div className={"flex justify-between mt"}>
                  <h1>Events</h1>
                  <NewEventDialog/>
              </div>
              <Separator />
              <p className={cn("text-center muted mt-8", events.length > 0 ? "hidden" : "")}>
                  No events have been pre-scouted for, yet.
              </p>
              <div className={"flex flex-wrap"}>{events.map(event => (
                    <Card className={"m-5 w-full sm:w-fit"} key={event.id}>
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>{event.eventName}</CardDescription>
                        </CardHeader>
                        <CardContent className={"flex"}>
                            {/*  progress and time till event  */}
                        </CardContent>
                        <CardFooter className={"flex justify-end"}>
                            <EventDropdown id={event.id} name={event.name}/>
                            <Link href={"/" + event.id}><Button>View Event</Button></Link>
                        </CardFooter>
                    </Card>
              ))}</div>
              <h1 className={"mt"}>API Status</h1>
              <Separator/>
              <div className={"m-4 bg-background"}>
                  <Table>
                      <TableHeader>
                          <TableRow className={"border-t-0"}>
                              <TableHead className="font-medium w-[10.6em]">API</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className={"w-5"}></TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                              <TableCell>The Blue Alliance</TableCell>
                              <TableCell><Badge variant={"destructive"}>Invalid</Badge></TableCell>
                              <TableCell><ApiUpdateDropdown api={{api: "tba"}}/></TableCell>
                          </TableRow>
                          <TableRow className={"ag-row-odd"}>
                              <TableCell>Statbotics</TableCell>
                              <TableCell><Badge variant={"outline"}>Disabled</Badge></TableCell>
                              <TableCell><ApiUpdateDropdown api={{api: "tba"}}/></TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </div>
          </div>
    );
}
