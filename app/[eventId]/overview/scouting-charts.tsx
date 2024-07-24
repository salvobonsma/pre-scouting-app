'use client'

import {MatchEntry} from "@prisma/client";
import React from "react";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart} from "recharts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function ScoutingCharts({matches, forTeam}: {
    matches: (MatchEntry & { teamNumber: number })[],
    forTeam: boolean
}) {
    if (matches.length < 5) return (
          <p className={"mt-sm muted text-center"}>
              {forTeam ? (
                    "To view these charts you must scout at least 5 matches on this team."
              ) : (
                    "To view these charts you must scout at least 5 matches."
              )}
          </p>
    );
    matches.sort((a, b) => a.teamNumber - b.teamNumber)

    let teamRecords = [];
    for (const match of matches) {
        let team = teamRecords.find(team => team.teamNumber === match.teamNumber);

        if (team) {
            team.records += 1;
        } else {
            teamRecords.push({teamNumber: match.teamNumber, records: 1});
        }
    }
    teamRecords.sort((a, b) => a.records - b.records);

    function processScoring(scores: number[]) {
        let scoring = [];

        for (const score of scores) {
            let team = scoring.find(team => team.score === score);

            if (team) {
                team.total += 1;
            } else {
                scoring.push({score: score, total: 1});
            }
        }

        return scoring.sort((a, b) => a.score - b.score);
    }

    function barChart(config: ChartConfig, data: any[], dataKey: string, labelKey: string) {
        return (
              <ChartContainer config={config} className="h-48 w-full">
                  <BarChart accessibilityLayer data={data}>
                      <CartesianGrid vertical={false}/>
                      <ChartTooltip content={<ChartTooltipContent className={"w-40"} labelKey={labelKey}
                                                                  indicator={"line"}/>}/>
                      <Bar dataKey={dataKey} fill={`var(--chart-1)`} radius={2}/>
                  </BarChart>
              </ChartContainer>
        );
    }

    function areaChart(config: ChartConfig, data: any[], dataKey: string, labelKey: string) {
        return (
              <ChartContainer config={config} className="h-48 w-full">
                  <AreaChart accessibilityLayer data={data}>
                      <CartesianGrid vertical={false}/>
                      <ChartTooltip content={<ChartTooltipContent className={"w-40"} labelKey={labelKey}
                                                                  indicator={"line"}/>}/>
                      <Area
                            dataKey={dataKey}
                            type="natural"
                            fill="var(--chart-1)"
                            fillOpacity={0.4}
                            stroke="var(--chart-1)"
                      />
                  </AreaChart>
              </ChartContainer>
        );
    }

    function dualPiChart(labelA: string, aTotal: number, labelB: string, bTotal: number, labelC?: string, cTotal?: number, labelD?: string, dTotal?: number) {
        const config = {
            total: {
                label: "Total"
            },
            a: {
                label: labelA
            },
            b: {
                label: labelB
            },
            c: {
                label: labelC
            },
            d: {
                label: labelD
            }
        } satisfies ChartConfig;

        return (
              <ChartContainer
                    config={config}
                    className="m-[-2em] aspect-square h-60"
              >
                  <PieChart>
                      <ChartTooltip
                            content={<ChartTooltipContent indicator={"line"} nameKey={"key"}/>}
                      />
                      <Pie data={[
                          (aTotal > 0 &&
                                {
                                    key: "a",
                                    total: aTotal,
                                    fill: "var(--chart-1)"
                                }),
                          (bTotal > 0 &&
                                {
                                    key: "b",
                                    total: bTotal,
                                    fill: "var(--chart-2)"
                                }),
                          ((cTotal ?? 0) > 0 &&
                                {
                                    key: "c",
                                    total: cTotal,
                                    fill: "var(--chart-3)"
                                }),
                          ((dTotal ?? 0) > 0 &&
                                {
                                    key: "d",
                                    total: cTotal,
                                    fill: "var(--chart-4)"
                                })
                      ]} dataKey="total">
                          <LabelList
                                dataKey={"key"}
                                className="fill-foreground"
                                stroke="none"
                                fontSize={14}
                                formatter={(value: keyof typeof config) =>
                                      config[value]?.label
                                }
                          />
                      </Pie>
                  </PieChart>
              </ChartContainer>
        );
    }

    return (
          <>
              {
                    !forTeam && (
                          <div className={"flex flex-wrap gap-6 mt-sm"}>
                              <Card className={"w-full sm:w-96"}>
                                  <CardHeader>
                                      <CardTitle>Teams Recorded</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      {barChart({
                                          records: {
                                              label: "Records"
                                          }
                                      }, teamRecords, "records", "teamNumber")}
                                  </CardContent>
                              </Card>
                          </div>
                    )
              }
              <h2 className={"mt-sm"}>Autonomous</h2>
              <div className={"flex flex-wrap gap-6 mt-2"}>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Amp Scores</CardTitle>
                          <CardDescription>In autonomous</CardDescription>
                      </CardHeader>
                      <CardContent>
                          {areaChart({
                              total: {
                                  label: "Count"
                              }
                          }, processScoring(matches.map(value => value.autoAmpScores)), "total", "score")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Speaker Scores</CardTitle>
                          <CardDescription>In autonomous</CardDescription>
                      </CardHeader>
                      <CardContent>
                          {areaChart({
                              total: {
                                  label: "Count"
                              }
                          }, processScoring(matches.map(value => value.autoSpeakerScores)), "total", "score")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Left Starting Zone</CardTitle>
                          <CardDescription>In autonomous</CardDescription>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.leftStartingZone).length,
                                "False",
                                matches.filter(value => !value.leftStartingZone).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Picked Up Center Line Note</CardTitle>
                          <CardDescription>In autonomous</CardDescription>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.centerLineNote).length,
                                "False",
                                matches.filter(value => !value.centerLineNote).length
                          )}
                      </CardContent>
                  </Card>
              </div>
              <h2 className={"mt-sm"}>Teleop</h2>
              <div className={"flex flex-wrap gap-6 mt-2"}>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Amp Scores</CardTitle>
                          <CardDescription>In teleop</CardDescription>
                      </CardHeader>
                      <CardContent>
                          {areaChart({
                              total: {
                                  label: "Count"
                              }
                          }, processScoring(matches.map(value => value.teleopAmpScores)), "total", "score")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Speaker Scores</CardTitle>
                          <CardDescription>In teleop</CardDescription>
                      </CardHeader>
                      <CardContent>
                          {areaChart({
                              total: {
                                  label: "Count"
                              }
                          }, processScoring(matches.map(value => value.teleopSpeakerScores)), "total", "score")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Pickup From</CardTitle>
                          <CardDescription>In teleop</CardDescription>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "Neither",
                                matches.filter(value => value.pickupFrom.length == 0).length,
                                "Ground",
                                matches.filter(value => value.pickupFrom.includes("ground") && value.pickupFrom.length == 1).length,
                                "Source",
                                matches.filter(value => value.pickupFrom.includes("source") && value.pickupFrom.length == 1).length,
                                "Both",
                                matches.filter(value => value.pickupFrom.length == 2).length,
                          )}
                      </CardContent>
                  </Card>
              </div>
              <h2 className={"mt-sm"}>Endgame</h2>
              <div className={"flex flex-wrap gap-6 mt-2"}>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Final Status</CardTitle>
                          <CardDescription>In endgame</CardDescription>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "Not Attempted",
                                matches.filter(value => value.finalStatus == "notAttempted").length,
                                "Atp. & Failed",
                                matches.filter(value => value.finalStatus == "attemptedAndFailed").length,
                                "Parked",
                                matches.filter(value => value.finalStatus == "parked").length,
                                "Onstage",
                                matches.filter(value => value.finalStatus == "onstage").length,
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Scored in Trap</CardTitle>
                          <CardDescription>In endgame</CardDescription>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.trap).length,
                                "False",
                                matches.filter(value => !value.trap).length
                          )}
                      </CardContent>
                  </Card>
              </div>
              <h2 className={"mt-sm"}>Miscellaneous</h2>
              <div className={"flex flex-wrap gap-6 mt-2"}>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Driver Skill</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "Not Effective",
                                matches.filter(value => value.driverSkill == "notEffective").length,
                                "Average",
                                matches.filter(value => value.driverSkill == "average").length,
                                "Effective",
                                matches.filter(value => value.driverSkill == "effective").length,
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Defence Skill</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "Not Effective",
                                matches.filter(value => value.defenceSkill == "notEffective").length,
                                "Average",
                                matches.filter(value => value.defenceSkill == "average").length,
                                "Effective",
                                matches.filter(value => value.defenceSkill == "effective").length,
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Speed</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "Slow",
                                matches.filter(value => value.defenceSkill == "slow").length,
                                "Average",
                                matches.filter(value => value.defenceSkill == "average").length,
                                "Fast",
                                matches.filter(value => value.defenceSkill == "fast").length,
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Note Stuck</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.noteStuck).length,
                                "False",
                                matches.filter(value => !value.noteStuck).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Note Dropped</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.noteDrop).length,
                                "False",
                                matches.filter(value => !value.noteDrop).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Note Dropped</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.noteDrop).length,
                                "False",
                                matches.filter(value => !value.noteDrop).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Robot Breakage</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.breakage).length,
                                "False",
                                matches.filter(value => !value.breakage).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Immobilized</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.immobilized).length,
                                "False",
                                matches.filter(value => !value.immobilized).length
                          )}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Tippy</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          {dualPiChart(
                                "True",
                                matches.filter(value => value.tippy).length,
                                "False",
                                matches.filter(value => !value.tippy).length
                          )}
                      </CardContent>
                  </Card>
              </div>
          </>
    );
}