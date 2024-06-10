'use server'

import prisma from "@/lib/prisma";

export default async function SetTeamStatues(eventId: number, teamNumbers: number[], status: TeamStatus): Promise<{
    teamNumber: number;
    status: TeamStatus
}[]> {
    for (const teamNumber of teamNumbers) {
        // Should only be one update.
        await prisma.teamEntry.updateMany(
              {
                  where: {
                      eventId: eventId,
                      teamNumber: teamNumber
                  },
                  data: {
                      status: status
                  }
              }
        )
    }

    return (await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: eventId
              }
          }
    )).map(team => ({teamNumber: team.teamNumber ?? 0, status: team.status as TeamStatus}));
}

export type TeamStatus = "notStarted" | "inProgress" | "completed";