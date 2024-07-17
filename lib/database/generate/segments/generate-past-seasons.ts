'use server'

import {ActionResult} from "@/lib/database/generate/action-result";
import prisma from "@/lib/prisma";

export default async function GeneratePastSeasons(season: any, tbaTeam: any, teamNumber: number): Promise<ActionResult> {
    const data = {
        year: season.year,
        winrate: season.record.season.winrate ?? 0,
        rank: season.epa.ranks.total.rank ?? 0,
        totalTeams: season.epa.ranks.total.team_count ?? 0,
        epa: season.epa.breakdown.total_points.mean ?? 0,
        percentile: 1 - (season.epa.ranks.total.percentile ?? 0),
        teamNumber: teamNumber
    }

    if ((await prisma.teamPastSeason.findFirst({
        where: {
            teamNumber: tbaTeam.team_number,
            year: season.year
        }
    }))) {
        await prisma.teamPastSeason.updateMany(
              {
                  where: {
                      teamNumber: tbaTeam.team_number,
                      year: season.year
                  },
                  data
              }
        )
    } else {
        await prisma.teamPastSeason.create({data})
    }

    return {success: true};
}