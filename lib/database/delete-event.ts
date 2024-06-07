'use server'

import prisma from "@/lib/prisma";

export default async function DeleteEvent(id: number): Promise<ActionResult> {
    console.log("delete")
    await prisma.event.delete(
          {
              where: {
                  id: id
              }
          }
    )

    return {success: true, message: "Success"};
}

interface ActionResult {
    success: boolean,
    message: string
}