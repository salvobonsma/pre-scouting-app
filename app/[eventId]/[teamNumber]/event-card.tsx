import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import React from "react";
import QuickTooltip from "@/components/quick-tooltip";
import {withOrdinalSuffix} from "@/lib/utils";

export default function EventCard({event}: {
    event: {
        name: string,
        location: string,
        eventType: string,
        endDate: string,
        rank: number | null,
        totalTeams: number | null,
        wins: number,
        ties: number,
        losses: number,
        qualified: boolean,
        eliminatedAt: string | null,
        status: string | null,
        allianceNumber: number | null,
        alliancePick: number | null,
        awards: string[]
    }
}) {
    event.awards = event.awards
          .filter(value => !(value.includes("Winner") || value.includes("Finalist")))
          .map(value => value.split(" Award")[0]);

    return (
          <Card className={"w-full sm:w-[35em]"}>
              <CardHeader>
                  <CardTitle className={"flex justify-between w-full gap-2"}>
                      {event.name}
                      <Badge className={"self-center text-center"}>{event.eventType}</Badge>
                  </CardTitle>
                  <CardDescription>{event.location}</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className={"flex flex-wrap sm:grid sm:grid-cols-2 gap-y-6 gap-x-8"}>
                      <div className={"w-full"}>
                          <h2>Results</h2>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Event rank</p>
                              {
                                  event.rank ?
                                        <p>{withOrdinalSuffix(event.rank)} <span
                                              className={"muted"}>of {event.totalTeams}</span></p> :
                                        <p>N/A</p>
                              }
                          </div>
                          <div className={"flex justify-between"}>
                              <p className={"muted"}>Record</p>
                              <QuickTooltip
                                    trigger={<p>{`${event.wins}-${event.losses}-${event.ties}`}</p>}
                                    content={
                                        <div className={"w-20"}>
                                            <div className={"flex justify-between"}>
                                                <p className={"muted"}>Wins</p>
                                                <p>{event.wins}</p>
                                            </div>
                                            <div className={"flex justify-between"}>
                                                <p className={"muted"}>Losses</p>
                                                <p>{event.losses}</p>
                                            </div>
                                            <div className={"flex justify-between"}>
                                                <p className={"muted"}>Ties</p>
                                                <p>{event.ties}</p>
                                            </div>
                                        </div>
                                    }
                              />
                          </div>
                          {
                                event.awards.length > 0 && (
                                      <div className={"flex justify-between"}>
                                          <p className={"muted text-nowrap mr-2"}>Award{event.awards.length > 1 && "s"}</p>
                                          <div>
                                              {
                                                  event.awards.map((value, index) => (
                                                        <p key={index}
                                                           className="sm:w-44 text-right text-nowrap overflow-x-scroll">{value}</p>
                                                  ))
                                              }
                                          </div>
                                      </div>
                                )
                          }
                      </div>
                      {
                          event.qualified ? (
                                <div className={"w-full"}>
                                    <h2>Playoffs</h2>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Alliance</p>
                                        <p>Alliance {event.allianceNumber}</p>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <p className={"muted"}>Alliance role</p>
                                        <p>
                                            {event.alliancePick == 0 && "Captain"}
                                            {event.alliancePick == 1 && "Pick 1"}
                                            {event.alliancePick == 2 && "Pick 2"}
                                            {event.alliancePick == 3 && "Backup/Pick 3"}
                                        </p>
                                    </div>
                                    {
                                        event.status == "won" ? (
                                              <div className={"flex justify-end"}>
                                                  <p>Event winner</p>
                                              </div>
                                        ) : (
                                              <div className={"flex justify-between"}>
                                                  <p className={"muted"}>Eliminated at</p>
                                                  <p>{event.eliminatedAt}</p>
                                              </div>
                                        )
                                    }
                                </div>
                          ) : (
                                <div className={"w-full"}>
                                    <h2>Playoffs</h2>
                                    <div className={"flex justify-center"}>
                                        <p className={"muted"}>Did not qualify</p>
                                    </div>
                                </div>
                          )
                      }
                  </div>
              </CardContent>
          </Card>
    );
}