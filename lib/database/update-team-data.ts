'use server'

import prisma from "@/lib/prisma";
import {z} from "zod";
import {teamDataSchema} from "@/app/(event)/[id]/[team]/client-page";

export default async function UpdateTeamData(eventId: number, teamNumber: number, data: z.infer<typeof teamDataSchema>) {
    await prisma.teamEntry.updateMany(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              },
              data: data
          }
    )
}