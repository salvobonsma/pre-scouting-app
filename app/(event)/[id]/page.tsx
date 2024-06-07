import prisma from "@/lib/prisma";

export default async function Event({params}: { params: { id: string } }) {
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

    if (!eventData || !teamData) return;

    return (
          <>
              <p>{eventData.name}</p>
              <p>{eventData.year}</p>
              <p>{eventData.city}</p>
              <p>{eventData.startDate}</p>
              {
                  teamData.map(value => (<p>{value.teamNumber}</p>))
              }
          </>
    )
}