'use server'

import prisma from "@/lib/prisma";

export default async function UpdateTeamData(eventId: number, teamNumber: number, data: {
    notes: string
}) {
    await prisma.teamEntry.updateMany(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              },
              data: {
                  notes: data.notes
              }
          }
    )
}