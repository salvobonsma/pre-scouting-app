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
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LinkIcon, MoreVertical} from "lucide-react";
import {tba} from "@/lib/tba/tba";
import {statbotics} from "@/lib/statbotics/statbotics";
import EventDetails from "@/components/event-details";

export default async function Home() {
    const events = await prisma.event.findMany();
    events.sort((a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    let tbaStatus = statusBadge("noKey");
    if (process.env.TBA_KEY && process.env.TBA_KEY != "") {
        try {
            const tbaResponse = await tba.GET("/status", {cache: "no-store"});
            if (tbaResponse.response.status == 200) {
                tbaStatus = statusBadge("online");
            } else {
                tbaStatus = statusBadge("invalid");
            }
        } catch {
            tbaStatus = statusBadge("offline");
        }
    }

    let statboticsStatus = statusBadge("online");
    try {
        await statbotics.GET("/v3/", {cache: "no-store"});
    } catch {
        statboticsStatus = statusBadge("offline");
    }

    return (
          <>
              <div className={"flex justify-between mt"}>
                  <h1 className={"self-center"}>Events</h1>
                  <NewEventDialog/>
              </div>
              <Separator />
              <p className={cn("text-center muted mt-8", events.length > 0 ? "hidden" : "")}>
                  No events have been pre-scouted for, yet.
              </p>
              <div className={"flex flex-wrap"}>{events.map(async (event) => {
                  const teams = await prisma.teamEntry.count(
                        {
                            where: {
                                eventId: event.id
                            }
                        }
                  );

                  return (
                        <Card className={"m-5 w-full sm:w-fit"} key={event.id}>
                            <CardHeader>
                                <CardTitle>{event.name}</CardTitle>
                                <CardDescription>{event.eventName}</CardDescription>
                            </CardHeader>
                            <CardContent className={"w-80"}><EventDetails event={event} teams={teams}/></CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <EventDropdown id={event.id} name={event.name}/>
                                <Link href={"/" + event.id}><Button>View Event</Button></Link>
                            </CardFooter>
                        </Card>
                  )
              })}</div>
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
                              <TableCell>{tbaStatus}</TableCell>
                              <TableCell>
                                  <APIStatusDropdownMenu link={"https://www.thebluealliance.com/account"}
                                                         text={"Get API Key"}/>
                              </TableCell>
                          </TableRow>
                          <TableRow className={"ag-row-odd"}>
                              <TableCell>Statbotics</TableCell>
                              <TableCell>{statboticsStatus}</TableCell>
                              <TableCell>
                                  <APIStatusDropdownMenu link={"https://www.statbotics.io"} text={"Statbotics"}/>
                              </TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
              </div>
          </>
    );
}

function statusBadge(status: "online" | "invalid" | "noKey" | "offline") {
    switch (status) {
        case "online":
            return (<Badge>Online</Badge>);
        case "invalid":
            return (<Badge variant={"destructive"}>Invalid</Badge>);
        case "noKey":
            return (<Badge variant={"destructive"}>No key</Badge>);
        case "offline":
            return (<Badge variant={"destructive"}>Offline</Badge>);
    }
}

function APIStatusDropdownMenu(props: { link: string, text: string }) {
    return (
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"icon"}>
                      <MoreVertical/>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side={"bottom"} align={"end"}>
                  <Link target={"_blank"} href={props.link}>
                      <DropdownMenuItem>
                          <LinkIcon className="mr-2 h-4 w-4"/>
                          {props.text}
                      </DropdownMenuItem>
                  </Link>
              </DropdownMenuContent>
          </DropdownMenu>
    )
}
