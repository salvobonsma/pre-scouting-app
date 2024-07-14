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

    return (await prisma.matchEntry.findMany(
          {
              where: {
                  teamEntryId: teamEntryId
              }
          }
    )).map(value => ({
        key: value.matchKey == null ? "" : value.matchKey,
        status: value.status as MatchStatus
    }));
}