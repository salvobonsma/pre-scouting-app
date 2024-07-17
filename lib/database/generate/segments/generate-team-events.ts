'use server'

import {ActionResult} from "@/lib/database/action-result";
import {tba} from "@/lib/tba/tba";
import prisma from "@/lib/prisma";

export default async function GenerateTeamEvents(teamEvent: any, tbaTeam: any): Promise<ActionResult> {
    const status = (await tba.GET("/team/{team_key}/event/{event_key}/status", {
        params: {
            path: {
                team_key: tbaTeam.key,
                event_key: teamEvent.key
            },
        },
    }));
    if (!status.response.ok) {
        return {success: false, message: "TBA API request error (e): " + status.response.status}
    }
    if (!status.data) return {success: true};

    const awards = (await tba.GET("/team/{team_key}/event/{event_key}/awards", {
        params: {
            path: {
                team_key: tbaTeam.key,
                event_key: teamEvent.key
            },
        },
    }));
    if (!awards.data) {
        return {success: false, message: "TBA API request error (f): " + awards.response.status}
    }

    const data = {
        teamNumber: tbaTeam.team_number,
        eventKey: teamEvent.key,
        name: teamEvent.name,
        endDate: teamEvent.end_date,
        location: `${teamEvent.city}, ${teamEvent.state_prov}`,
        eventType: (teamEvent.event_type_string == "District" || teamEvent.event_type_string == "Regional") && teamEvent.week != undefined ?
              `Week ${teamEvent.week + 1}` : teamEvent.event_type_string,
        rank: status.data.qual?.ranking?.rank,
        totalTeams: status.data.qual?.num_teams,
        wins: (status.data.qual?.ranking?.record?.wins ?? 0) + (status.data.playoff?.record?.wins ?? 0),
        ties: (status.data.qual?.ranking?.record?.ties ?? 0) + (status.data.playoff?.record?.ties ?? 0),
        losses: (status.data.qual?.ranking?.record?.losses ?? 0) + (status.data.playoff?.record?.losses ?? 0),
        qualified: status.data.playoff != null,
        eliminatedAt: status.data.playoff?.double_elim_round,
        status: status.data.playoff?.status,
        allianceNumber: status.data.alliance?.number,
        alliancePick: status.data.alliance?.pick,
        awards: awards.data.map((value) => value.name)
    }

    if ((await prisma.teamEvent.findFirst({
        where: {
            teamNumber: tbaTeam.team_number,
            eventKey: teamEvent.key,
        }
    }))) {
        await prisma.teamEvent.updateMany(
              {
                  where: {
                      teamNumber: tbaTeam.team_number,
                      eventKey: teamEvent.key,
                  },
                  data
              }
        )
    } else {
        await prisma.teamEvent.create({data})
    }

    return {success: true}
}