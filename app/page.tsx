import {Separator} from "@/components/ui/separator";
import NewEventDialog from "@/components/dialogs/new-event-dialog";
import prisma from "@/lib/prisma";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import EventDropdown from "@/components/event-dropdown";

export default async function Home() {
    const events = await prisma.event.findMany();

    return (
          <>
              <div className={"flex justify-between mt-14"}>
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
          </>
    );
}
