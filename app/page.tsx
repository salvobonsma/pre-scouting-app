import {Separator} from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import EventDropdown from "@/app/event-dropdown";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LinkIcon, MoreVertical} from "lucide-react";
import {tba} from "@/lib/tba/tba";
import {statbotics} from "@/lib/statbotics/statbotics";
import EventDetails from "@/components/event-details";
import DemoDialog from "@/app/demo-dialog";

export const dynamic = "force-dynamic";

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
              <DemoDialog/>
              <div className={"flex justify-between mt"}>
                  <h1 className={"self-center"}>Events</h1>
                  <Button disabled>New Event</Button>
              </div>
              <Separator/>
              <p className={cn("text-center muted mt-8", events.length > 0 ? "hidden" : "")}>
                  No events have been pre-scouted for, yet.
              </p>
              <div className={"flex flex-wrap mt-sm gap-6"}>{events.map(async (event) => {
                  const teams = await prisma.teamEntry.count(
                        {
                            where: {
                                eventId: event.id
                            }
                        }
                  );

                  return (
                        <Card className={"w-full sm:w-fit"} key={event.id}>
                            <CardHeader>
                                <CardTitle>{event.name}</CardTitle>
                                <CardDescription>{event.eventName}</CardDescription>
                            </CardHeader>
                            <CardContent className={"min-w-80"}>
                                <EventDetails event={event} teams={teams}/>
                            </CardContent>
                            <CardFooter className={"flex justify-end"}>
                                <EventDropdown id={event.id} name={event.name}/>
                                <a href={"/" + event.id}><Button>View Event</Button></a>
                            </CardFooter>
                        </Card>
                  )
              })}</div>
              <h1 className={"mt"}>API Status</h1>
              <Separator/>
              <div className={"mt-sm"}>
                  <Table>
                      <TableHeader>
                          <TableRow className={"border-t-0"}>
                              <TableHead className="font-medium w-[10.7em]">API</TableHead>
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
                                                         text={"Get an API Key"}/>
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
                  <a target={"_blank"} href={props.link}>
                      <DropdownMenuItem>
                          <LinkIcon className="mr-2 h-4 w-4"/>
                          {props.text}
                      </DropdownMenuItem>
                  </a>
              </DropdownMenuContent>
          </DropdownMenu>
    )
}
