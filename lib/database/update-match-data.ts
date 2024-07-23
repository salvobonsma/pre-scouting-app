'use server'

import prisma from "@/lib/prisma";
import {matchDataSchema} from "@/app/(event)/[eventId]/[teamNumber]/matches/match";
import {z} from "zod";

export default async function UpdateMatchData(key: string, teamEntryId: number, data: z.infer<typeof matchDataSchema>) {
    await prisma.matchEntry.updateMany(
          {
              where: {
                  matchKey: key,
                  teamEntryId: teamEntryId
              },
              data: data
          }
    );

    return prisma.matchEntry.findFirst(
          {
              where: {
                  matchKey: key,
                  teamEntryId: teamEntryId
              }
          }
    );
}