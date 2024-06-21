"use server"

import prisma from "@/lib/prisma";
import {tba} from "@/lib/tba/tba";
import {redirect} from "next/navigation";
import {statbotics} from "@/lib/statbotics/statbotics";

export default async function NewEvent(key: string, year: number, name: string): Promise<ActionResult> {
    const event = (await tba.GET("/event/{event_key}", {
        params: {
            path: {event_key: key},
        },
    }))
    if (!event.data) {
        return {success: false, message: "TBA API request error: " + event.response.status}
    }

    if (await prisma.event.findUnique({
        where: {
            name: name
        }
    })) return {success: false, message: "Name has already been taken"};

    const eventId = (await prisma.event.create({
        data: {
            key: key,
            year: year,
            startDate: event.data.start_date,
            name: name,
            eventName: event.data.name,
            district: event.data.district?.display_name,
            type: event.data.event_type_string,
            city: event.data.city
        }
    })).id;

    const tbaTeams = (await tba.GET("/event/{event_key}/teams", {
        params: {
            path: {event_key: key},
        },
    }));
    if (!tbaTeams.data) {
        return {success: false, message: "TBA API request error: " + tbaTeams.response.status}
    }

    for (const tbaTeam of tbaTeams.data) {
        let team = await prisma.team.findUnique({
            where: {
                number: tbaTeam.team_number
            }
        });

        if (!team) {
            team = await prisma.team.create(
                  {
                      data: {
                          number: tbaTeam.team_number,
                          key: tbaTeam.key,
                          name: tbaTeam.nickname,
                          state: tbaTeam.state_prov,
                          school: tbaTeam.school_name,
                          rookieYear: tbaTeam.rookie_year,
                      }
                  }
            )
        }

        const stats = await statbotics.GET("/v3/team_year/{team}/{year}", {
            params: {path: {year: year, team: tbaTeam.team_number.toString()}}
        });
        if (!stats.data) return {success: false, message: "Statbotics API request error: " + stats.response.status};

        const teamEntryId = (await prisma.teamEntry.create(
              {
                  data: {
                      key: tbaTeam.key,
                      eventId: eventId,
                      name: tbaTeam.nickname,
                      teamNumber: tbaTeam.team_number,
                      wins: stats.data.record.season.wins,
                      ties: stats.data.record.season.ties,
                      losses: stats.data.record.season.losses,
                      worldRank: stats.data.epa.ranks.total.rank,
                      worldTotal: stats.data.epa.ranks.total.team_count,
                      countyRank: stats.data.epa.ranks.country.rank,
                      countyTotal: stats.data.epa.ranks.country.team_count,
                      districtRank: stats.data.epa.ranks.district.rank,
                      districtTotal: stats.data.epa.ranks.district.team_count,
                      autoEPA: stats.data.epa.breakdown.auto_points.mean,
                      teleopEPA: stats.data.epa.breakdown.teleop_points.mean,
                      endgameEPA: stats.data.epa.breakdown.endgame_points.mean
                  }
              }
        )).id;

        const tbaMatches = (await tba.GET("/team/{team_key}/matches/{year}", {
            params: {
                path: {
                    team_key: tbaTeam.key,
                    year: year
                },
            },
        }))
        if (!tbaMatches.data) {
            return {success: false, message: "TBA API request error: " + tbaMatches.response.status}
        }

        for (const tbaMatch of tbaMatches.data) {
            const match = await prisma.match.findUnique({
                where: {
                    key: tbaMatch.key
                }
            });
            if (!match) {
                await prisma.match.create(
                      {
                          data: {
                              key: tbaMatch.key,
                              matchNumber: tbaMatch.match_number,
                              redScore: tbaMatch.alliances?.red?.score,
                              blueScore: tbaMatch.alliances?.blue?.score,
                              scoreBreakdown: JSON.stringify(tbaMatch.score_breakdown),
                              videoId: tbaMatch.videos?.find(x => x.type == "youtube")?.key
                          }
                      }
                )
            }

            await prisma.matchEntry.create(
                  {
                      data: {
                          teamEntryId: teamEntryId,
                          matchKey: tbaMatch.key
                      }
                  }
            )
        }

    }

    return redirect("/" + eventId);
}

interface ActionResult {
    success: boolean,
    message: string
}