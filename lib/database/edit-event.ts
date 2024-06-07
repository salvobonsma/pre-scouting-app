'use server'

import prisma from "@/lib/prisma";

export default async function EditEvent(id: number, newName: string): Promise<ActionResult> {
    const nameCheck = await prisma.event.findUnique(
          {
              where: {
                  name: newName
              }
          }
    );
    if (nameCheck) return {success: false, message: "Name has already been taken"};

    await prisma.event.update(
          {
              where: {
                  id: id
              },
              data: {
                  name: newName
              }
          }
    )

    return {success: true, message: "Success"};
}

interface ActionResult {
    success: boolean,
    message: string
}