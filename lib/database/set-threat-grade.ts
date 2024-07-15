'use server'

import prisma from "@/lib/prisma";

export default async function SetThreatGrade(eventId: number, teamNumber: number, grade: ThreatGradeType, status: string) {
    if ((await prisma.teamEntry.findFirst(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              }
          }
    ))?.threatGrade == grade) return;

    await prisma.teamEntry.updateMany(
          {
              where: {
                  eventId: eventId,
                  teamNumber: teamNumber
              },
              data: {
                  threatGrade: grade,
                  threatGradeModified: true,
                  status: status == "notStarted" ? "inProgress" : status
              }
          }
    );
}

export type ThreatGradeType = "A" | "B" | "C" | "D" | "E" | "F";