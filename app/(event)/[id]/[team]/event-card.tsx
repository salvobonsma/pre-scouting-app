import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import React from "react";
import QuickTooltip from "@/components/quick-tooltip";
import TeamLink from "@/components/team-link";

export default function EventCard() {
    return (
          <Card className={"w-full sm:w-[35em]"}>
              <CardHeader>
                  <CardTitle className={"flex justify-between w-full"}>
                      PNW District Auburn Event
                      <Badge className={"self-center text-center"}>Week 2</Badge>
                  </CardTitle>
                  <CardDescription>Auburn, WA</CardDescription>
              </CardHeader>
              <CardContent className={"flex flex-wrap sm:grid sm:grid-cols-2 gap-y-6 gap-x-8"}>
                  <div className={"w-full"}>
                      <h2>Results</h2>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Event rank</p>
                          <p>7th <span className={"muted"}>of 34</span></p>
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Record</p>
                          <QuickTooltip
                                trigger={<p>9-6-0</p>}
                                content={
                                    <div className={"w-20"}>
                                        <div className={"flex justify-between"}>
                                            <p className={"muted"}>Wins</p>
                                            <p>9</p>
                                        </div>
                                        <div className={"flex justify-between"}>
                                            <p className={"muted"}>Losses</p>
                                            <p>6</p>
                                        </div>
                                        <div className={"flex justify-between"}>
                                            <p className={"muted"}>Ties</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                }
                          />
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted text-nowrap mr-1"}>Awards</p>
                          <div>
                              <p className={"text-right"}>Rookie All Star</p>
                              <p className={"text-right"}>Rookie All Star</p>
                          </div>
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Eliminated at</p>
                          <p>Round 3</p>
                      </div>
                  </div>
                  <div className={"w-full"}>
                      <h2>Playoff Alliance</h2>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Captain</p>
                          <TeamLink eventId={1} teamNumber={9442} currentTeam={9442}/>
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Pick 1</p>
                          <TeamLink eventId={1} teamNumber={254} currentTeam={9442}/>
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Pick 2</p>
                          <p>9442</p>
                      </div>
                      <div className={"flex justify-between"}>
                          <p className={"muted"}>Backup</p>
                          <p>9442</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
    );
}