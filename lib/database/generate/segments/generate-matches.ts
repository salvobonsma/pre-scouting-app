'use server'

import {ActionResult} from "@/lib/database/generate/action-result";
import prisma from "@/lib/prisma";

export default async function GenerateMatches(tbaMatch: any, teamEntryId: number): Promise<ActionResult> {
    // Skip progress matches
    if (tbaMatch.actual_time == undefined) return {success: true};

    const data = {
        key: tbaMatch.key,
        startTime: tbaMatch.actual_time,
        eventKey: tbaMatch.event_key,
        matchNumber: tbaMatch.match_number,
        compLevel: tbaMatch.comp_level,
        winningAlliance: tbaMatch.winning_alliance ?? "red",
        scoreBreakdown: JSON.stringify(tbaMatch.score_breakdown),
        redScore: tbaMatch.alliances?.red?.score ?? 0,
        redTeamKeys: tbaMatch.alliances?.red?.team_keys ?? [],
        blueScore: tbaMatch.alliances?.blue?.score ?? 0,
        blueTeamKeys: tbaMatch.alliances?.blue?.team_keys ?? [],
        videoId: tbaMatch.videos?.find((x: { type: string }) => x.type == "youtube")?.key
    }

    if ((await prisma.match.findFirst({
        where: {
            key: tbaMatch.key
        }
    }))) {
        await prisma.match.updateMany(
              {
                  where: {
                      key: tbaMatch.key
                  },
                  data
              }
        )
    } else {
        await prisma.match.create({data})
    }

    await prisma.matchEntry.create(
          {
              data: {
                  teamEntryId: teamEntryId,
                  status: "notStarted",
                  matchKey: tbaMatch.key
              }
          }
    );

    return {success: true};
}