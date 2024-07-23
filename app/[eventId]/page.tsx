import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import EventDetails from "@/components/event-details";
import {Button} from "@/components/ui/button";
import ClientPage from "@/app/[eventId]/client-page";

export default async function Event({params}: { params: { eventId: string } }) {
    if (!+params.eventId) return NotFound();

    const eventData = await prisma.event.findUnique(
          {
              where: {
                  id: +params.eventId
              }
          }
    );
    const teamData = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: +params.eventId
              }
          }
    );
    if (!eventData || !teamData) return NotFound();

    const greatestThreat = teamData.sort((a, b) => (b.totalEPA ?? 0) - (a.totalEPA ?? 0))[0];

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
                                  <p className={"muted"}>Greatest threat</p>
                                  <p>{greatestThreat.teamNumber}</p>
                              </div>
                              <div className={"flex justify-between"}>
                                  <p className={"muted"}>Total EPA</p>
                                  <p>{greatestThreat.totalEPA?.toFixed(1)}</p>
                              </div>
                          </CardContent>
                          <CardFooter className={"flex justify-end"}>
                              <a href={`/${params.eventId}/overview`}><Button>View Full Overview</Button></a>
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