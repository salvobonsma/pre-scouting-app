'use server'

import prisma from "@/lib/prisma";

export type MatchStatus = "notStarted" | "inProgress" | "completed";

export default async function SetMatchStatuses(status: MatchStatus, teamEntryId: number, matchKeys: string[]) {
    await prisma.matchEntry.updateMany(
          {
              where: {
                  teamEntryId: teamEntryId,
                  OR: matchKeys.map(key => ({matchKey: key}))
              },
              data: {
                  status: status
              }
          }
    );
}