"use server"

import prisma from "@/lib/prisma";
import {tba} from "@/lib/tba/tba";
import {redirect} from "next/navigation";
import {statbotics} from "@/lib/statbotics/statbotics";
import {zScore} from "@/lib/utils";

export default async function NewEvent(key: string, year: number, name: string): Promise<ActionResult> {
    const event = (await tba.GET("/event/{event_key}", {
        params: {
            path: {event_key: key},
        },
    }))
    if (!event.data) {
        return {success: false, message: "TBA API request error (a): " + event.response.status}
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
            endDate: event.data.end_date,
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
        return {success: false, message: "TBA API request error (b): " + tbaTeams.response.status}
    }

    for (const tbaTeam of tbaTeams.data) {
        // Team
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

        // Team entry
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
                      eventTotal: tbaTeams.data.length,
                      autoEPA: stats.data.epa.breakdown.auto_points.mean,
                      teleopEPA: stats.data.epa.breakdown.teleop_points.mean,
                      endgameEPA: stats.data.epa.breakdown.endgame_points.mean,
                      totalEPA: (stats.data.epa.breakdown.auto_points.mean ?? 0) +
                            (stats.data.epa.breakdown.teleop_points.mean ?? 0) +
                            (stats.data.epa.breakdown.endgame_points.mean ?? 0)
                  }
              }
        )).id;

        // Events for each team
        const teamEvents = (await tba.GET("/team/{team_key}/events/{year}", {
            params: {
                path: {
                    team_key: tbaTeam.key,
                    year: year
                },
            },
        }));
        if (!teamEvents.data) {
            return {success: false, message: "TBA API request error (c): " + teamEvents.response.status}
        }

        for (const teamEvent of teamEvents.data) {
            const status = (await tba.GET("/team/{team_key}/event/{event_key}/status", {
                params: {
                    path: {
                        team_key: tbaTeam.key,
                        event_key: teamEvent.key
                    },
                },
            }));
            if (!status.response.ok) {
                return {success: false, message: "TBA API request error (d): " + status.response.status}
            }
            if (!status.data) continue;

            const awards = (await tba.GET("/team/{team_key}/event/{event_key}/awards", {
                params: {
                    path: {
                        team_key: tbaTeam.key,
                        event_key: teamEvent.key
                    },
                },
            }));
            if (!awards.data) {
                return {success: false, message: "TBA API request error (e): " + awards.response.status}
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
        }

        // Matches
        const tbaMatches = (await tba.GET("/team/{team_key}/matches/{year}", {
            params: {
                path: {
                    team_key: tbaTeam.key,
                    year: year
                },
            },
        }))
        if (!tbaMatches.data) {
            return {success: false, message: "TBA API request error (f): " + tbaMatches.response.status}
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

    // Stats
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

    // test

    for (const team of teamEntries) {
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
    }

    return redirect("/" + eventId);
}

interface ActionResult {
    success: boolean,
    message: string
}