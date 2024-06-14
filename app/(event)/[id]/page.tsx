import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import EventDetails from "@/components/event-details";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import ClientPage from "@/app/(event)/[id]/client-page";

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
    if (!eventData || !teamData) return NotFound();

    return (
          <ClientPage
                event={eventData}
                teams={teamData}
                eventDetails={(
                      <Card className={"w-full sm:w-80"}>
                          <CardHeader>
                              <CardTitle>Event Details</CardTitle>
                          </CardHeader>
                          <CardContent><EventDetails event={eventData} teams={teamData.length}/></CardContent>
                      </Card>
                )}
                overview={teamData.length > 0 ? (
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
                ) : (
                      <Card className={"w-full sm:w-80"}>
                          <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                          <CardContent>
                              <p className={"muted"}>Not enough data to generate an overview.</p>
                          </CardContent>
                      </Card>
                )}
          />
    );
}