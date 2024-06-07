import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";

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
          <>
              <p>{eventData.name}</p>
              <p>{eventData.year}</p>
              <p>{eventData.city}</p>
              <p>{eventData.startDate}</p>
              {
                  teamData.map(value => (<p key={value.id}>{value.teamNumber}</p>))
              }
          </>
    )
}