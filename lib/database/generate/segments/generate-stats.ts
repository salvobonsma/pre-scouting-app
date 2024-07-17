'use server'

import {ActionResult} from "@/lib/database/generate/action-result";
import prisma from "@/lib/prisma";
import {zScore} from "@/lib/utils";

export default async function GenerateStats(eventId: number): Promise<ActionResult> {
    const teamEntries = await prisma.teamEntry.findMany(
          {
              where: {
                  eventId: eventId
              }
          }
    );
    const autoEPAs = teamEntries.map(team => team.autoEPA ?? 0);
    const teleopEPAs = teamEntries.map(team => team.teleopEPA ?? 0);
    const endgameEPAs = teamEntries.map(team => team.endgameEPA ?? 0);
    const totalEPAs = teamEntries.map(team => team.totalEPA ?? 0);

    teamEntries.sort((a, b) =>
          (b.totalEPA ?? 0) - (a.totalEPA ?? 0)
    );

    await Promise.all(teamEntries.map(async team => {
        const totalDeviation = zScore(totalEPAs, team.totalEPA ?? 0);
        let threatGrade;
        if (totalDeviation > 1) {
            threatGrade = "A";
        } else if (totalDeviation > 2 / 3) {
            threatGrade = "B";
        } else if (totalDeviation > 1 / 3) {
            threatGrade = "C";
        } else if (totalDeviation > -1 / 3) {
            threatGrade = "D";
        } else if (totalDeviation > -2 / 3) {
            threatGrade = "E";
        } else {
            threatGrade = "F";
        }

        await prisma.teamEntry.updateMany(
              {
                  where: {
                      eventId: eventId,
                      teamNumber: team.teamNumber
                  },
                  data: {
                      autoDeviation: zScore(autoEPAs, team.autoEPA ?? 0),
                      teleopDeviation: zScore(teleopEPAs, team.teleopEPA ?? 0),
                      endgameDeviation: zScore(endgameEPAs, team.endgameEPA ?? 0),
                      totalDeviation: totalDeviation,
                      threatGrade: threatGrade,
                      eventRank: teamEntries.findIndex(value => value.teamNumber == team.teamNumber) + 1
                  }
              }
        );
    }));

    return {success: true};
}