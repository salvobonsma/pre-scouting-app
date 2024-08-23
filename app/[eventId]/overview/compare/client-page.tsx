'use client'

import {Team, TeamEntry} from "@prisma/client";
import Back from "@/components/back";
import React from "react";

export default function ClientPage({eventId, a, b}: {
    eventId: number,
    a: {
        team: Team,
        entry: TeamEntry
    },
    b: {
        team: Team,
        entry: TeamEntry
    }
}) {
    return (
          <>
              <Back link={`/${eventId}/overview`} display={"Event Overview"}/>
              <div className={"lg:hidden"}>

              </div>
              <div className={"hidden lg:block"}>

              </div>
          </>
    );
}