'use server'

import prisma from "@/lib/prisma";

export default async function SetThreatGrade(eventId: number, teamNumber: number, grade: ThreatGradeType) {
    await prisma.teamEntry.updateMany(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              },
              data: {
                  threatGrade: grade
              }
          }
    );
}

export type ThreatGradeType = "A" | "B" | "C" | "D" | "E" | "F";