'use server'

import {ActionResult} from "@/lib/database/action-result";
import prisma from "@/lib/prisma";
import {percentile, zScore} from "@/lib/utils";

export default async function GenerateStats(eventId: number, update: boolean): Promise<ActionResult> {
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

    for (const team of teamEntries) {
        let totalDeviation = zScore(totalEPAs, team.totalEPA ?? 0);
        const totalPercentile = percentile(totalDeviation);
        let threatGrade;
        if (totalPercentile > 5 / 6) {
            threatGrade = "A";
        } else if (totalPercentile > 4 / 6) {
            threatGrade = "B";
        } else if (totalPercentile > 3 / 6) {
            threatGrade = "C";
        } else if (totalPercentile > 2 / 6) {
            threatGrade = "D";
        } else if (totalPercentile > 1 / 6) {
            threatGrade = "E";
        } else {
            threatGrade = "F";
        }
        
        let teleopDeviation = zScore(teleopEPAs, team.teleopEPA ?? 0);
        let autoDeviation = zScore(autoEPAs, team.autoEPA ?? 0);
        let endgameDeviation = zScore(endgameEPAs, team.endgameEPA ?? 0);
        if (isNaN(teleopDeviation)) teleopDeviation = 0;
        if (isNaN(autoDeviation)) autoDeviation = 0;
        if (isNaN(endgameDeviation)) endgameDeviation = 0;
        if (isNaN(totalDeviation)) totalDeviation = 0;

        await prisma.teamEntry.updateMany(
              {
                  where: {
                      eventId: eventId,
                      teamNumber: team.teamNumber
                  },
                  data: {
                      autoDeviation: autoDeviation,
                      teleopDeviation: teleopDeviation,
                      endgameDeviation: endgameDeviation,
                      totalDeviation: totalDeviation,
                      threatGrade: update ? undefined : threatGrade,
                      eventRank: teamEntries.findIndex(value => value.teamNumber == team.teamNumber) + 1
                  }
              }
        );
    }

    return {success: true};
}