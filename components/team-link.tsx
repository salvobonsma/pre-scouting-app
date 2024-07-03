import {Button} from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function TeamLink({eventId, teamNumber, currentTeam}: {
    eventId: number,
    teamNumber: number,
    currentTeam?: number
}) {
    if (teamNumber == currentTeam) return (<p>{teamNumber}</p>);

    const team = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              }
          }
    );

    if (team.length > 0) {
        return (
              <Button className={"p-0 h-fit self-center font-normal text-md"} variant={"link"} asChild>
                  <a href={`/${eventId}/${teamNumber}`}>{teamNumber}</a>
              </Button>
        );
    } else {
        return (<p>{teamNumber}</p>);
    }
}