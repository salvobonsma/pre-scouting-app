import NotFound from "@/app/not-found";
import prisma from "@/lib/prisma";
import ClientPage from "@/app/(event)/[id]/[team]/client-page";

export default async function ({params}: { params: { id: string, team: string } }) {
    if (!+params.id || !+params.team) return NotFound();

    const event = await prisma.event.findUnique(
          {
              where: {
                  id: +params.id
              }
          }
    );
    if (!event) return NotFound();
    const team = await prisma.team.findUnique(
          {
              where: {
                  number: +params.team
              }
          }
    )
    const teamEntry = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: event.id,
                  teamNumber: +params.team
              }
          }
    );
    if (!team || !teamEntry) return NotFound();

    return (
          <ClientPage event={event} team={team} teamEntry={teamEntry[0]}/>
    );
}