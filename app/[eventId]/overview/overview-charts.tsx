"use client";

import {Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart} from "recharts";

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {TeamEntry} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

export default function OverviewCharts({teamEntries}: { teamEntries: TeamEntry[] }) {
    const [sortedTeamEntries, setSortedTeamEntries] = useState<TeamEntry[] | undefined>();
    const [sorting, setSorting] = useState("default");

    useEffect(() => {
        const sortedEntries = [...teamEntries]; // Create a copy of the teamEntries array
        switch (sorting) {
            case "default":
                setSortedTeamEntries(undefined);
                break;
            case "autoEPA":
                sortedEntries.sort((a, b) =>
                      (a.autoEPA ?? 0) - (b.autoEPA ?? 0)
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "teleopEPA":
                sortedEntries.sort((a, b) =>
                      (a.teleopEPA ?? 0) - (b.teleopEPA ?? 0)
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "endgameEPA":
                sortedEntries.sort((a, b) =>
                      (a.endgameEPA ?? 0) - (b.endgameEPA ?? 0)
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "totalEPA":
                sortedEntries.sort((a, b) =>
                      (a.totalEPA ?? 0) - (b.totalEPA ?? 0)
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "threatGrade":
                sortedEntries.sort((a, b) => {
                    const grade = threadGradeIndex(b.threatGrade ?? "") - threadGradeIndex(a.threatGrade ?? "");
                    if (grade == 0) return (a.totalEPA ?? 0) - (b.totalEPA ?? 0);
                    return grade;
                });
                setSortedTeamEntries(sortedEntries);
                break;
            case "winrate":
                sortedEntries.sort((a, b) =>
                      winrate(a) - winrate(b)
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "worldRank":
                sortedEntries.sort((a, b) =>
                      (b.worldRank ?? 0) - (a.worldRank ?? 0)
                );
                setSortedTeamEntries(sortedEntries);
                break;
        }
    }, [sorting, teamEntries]);

    function threadGradeIndex(grade: string) {
        switch (grade) {
            case "A":
                return 0;
            case "B":
                return 1;
            case "C":
                return 2;
            case "D":
                return 3;
            case "E":
                return 4;
            case "F":
                return 5;
            default:
                return -1;
        }
    }

    function winrate(teamEntry: TeamEntry) {
        return (teamEntry.wins ?? 0) / ((teamEntry.losses ?? 0) + (teamEntry.wins ?? 0));
    }

    const threatGradeConfig = {
        total: {
            label: "Total"
        },
        a: {
            label: "A"
        },
        b: {
            label: "B"
        },
        c: {
            label: "C"
        },
        d: {
            label: "D"
        },
        e: {
            label: "E"
        },
        f: {
            label: "F"
        }
    } satisfies ChartConfig

    function chart(config: ChartConfig, data: any[], dataKey: string) {
        data = data.map(value => ({
            ...value,
            winrate: winrate(value)
        }));

        return (
              <ChartContainer config={config} className="h-48 w-full">
                  <BarChart accessibilityLayer data={data}>
                      <CartesianGrid vertical={false}/>
                      <ChartTooltip content={<ChartTooltipContent className={"w-40"} labelKey={"teamNumber"}
                                                                  indicator={"line"}/>}/>
                      <Bar dataKey={dataKey} fill={`var(--chart-1)`} radius={2}/>
                  </BarChart>
              </ChartContainer>
        );
    }

    return (
          <div className={"space-y-4 mt-4"}>
              <div className={"flex justify-center sm:justify-end gap-3 items-center"}>
                  <Label>Sort by:</Label>
                  <Select value={sorting} onValueChange={setSorting}>
                      <SelectTrigger className="w-48">
                          <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="autoEPA">Auto EPA</SelectItem>
                          <SelectItem value="teleopEPA">Teleop EPA</SelectItem>
                          <SelectItem value="endgameEPA">Endgame EPA</SelectItem>
                          <SelectItem value="totalEPA">Total EPA</SelectItem>
                          <SelectItem value="winrate">Winrate</SelectItem>
                          <SelectItem value="worldRank">World Rank</SelectItem>
                          <SelectItem value="threatGrade">Threat Grade</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className={"flex flex-wrap gap-6"}>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Auto EPA</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              autoEPA: {
                                  label: "Auto EPA"
                              }
                          }, sortedTeamEntries ?? [...teamEntries].sort((a, b) =>
                                (a.autoEPA ?? 0) - (b.autoEPA ?? 0)
                          ), "autoEPA")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Teleop EPA</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              teleopEPA: {
                                  label: "Teleop EPA"
                              }
                          }, sortedTeamEntries ?? [...teamEntries].sort((a, b) =>
                                (a.teleopEPA ?? 0) - (b.teleopEPA ?? 0)
                          ), "teleopEPA")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Endgame EPA</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              endgameEPA: {
                                  label: "Endgame EPA"
                              }
                          }, sortedTeamEntries ?? [...teamEntries].sort((a, b) =>
                                (a.endgameEPA ?? 0) - (b.endgameEPA ?? 0)
                          ), "endgameEPA")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Total EPA</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              totalEPA: {
                                  label: "Total EPA"
                              }
                          }, sortedTeamEntries ?? [...teamEntries].sort((a, b) =>
                                (a.totalEPA ?? 0) - (b.totalEPA ?? 0)
                          ), "totalEPA")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Winrate</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              winrate: {
                                  label: "Winrate"
                              }
                          }, sortedTeamEntries ?? [...teamEntries].sort((a, b) =>
                                winrate(a) - winrate(b)
                          ), "winrate")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>World Rank</CardTitle>
                      </CardHeader>
                      <CardContent>
                          {chart({
                              worldRank: {
                                  label: "World Rank"
                              }
                          }, sortedTeamEntries ? [...sortedTeamEntries].reverse() : undefined ?? [...teamEntries].sort((a, b) =>
                                (a.worldRank ?? 0) - (b.worldRank ?? 0)
                          ), "worldRank")}
                      </CardContent>
                  </Card>
                  <Card className={"w-full sm:w-96"}>
                      <CardHeader>
                          <CardTitle>Threat Grades</CardTitle>
                      </CardHeader>
                      <CardContent className={"flex justify-center"}>
                          <ChartContainer
                                config={threatGradeConfig}
                                className="m-[-2em] aspect-square h-60"
                          >
                              <PieChart>
                                  <ChartTooltip
                                        content={<ChartTooltipContent indicator={"line"} nameKey="threatGrade"/>}
                                  />
                                  <Pie data={[
                                      {
                                          threatGrade: "a",
                                          total: teamEntries.filter(value => value.threatGrade == "A").length,
                                          fill: "var(--chart-1)"
                                      },
                                      {
                                          threatGrade: "b",
                                          total: teamEntries.filter(value => value.threatGrade == "B").length,
                                          fill: "var(--chart-2)"
                                      },
                                      {
                                          threatGrade: "c",
                                          total: teamEntries.filter(value => value.threatGrade == "C").length,
                                          fill: "var(--chart-3)"
                                      },
                                      {
                                          threatGrade: "d",
                                          total: teamEntries.filter(value => value.threatGrade == "D").length,
                                          fill: "var(--chart-4)"
                                      },
                                      {
                                          threatGrade: "e",
                                          total: teamEntries.filter(value => value.threatGrade == "E").length,
                                          fill: "var(--chart-5)"
                                      },
                                      {
                                          threatGrade: "f",
                                          total: teamEntries.filter(value => value.threatGrade == "F").length,
                                          fill: "var(--chart-6)"
                                      }
                                  ]} dataKey="total">
                                      <LabelList
                                            dataKey="threatGrade"
                                            className="fill-foreground"
                                            stroke="none"
                                            fontSize={14}
                                            formatter={(value: keyof typeof threatGradeConfig) =>
                                                  threatGradeConfig[value]?.label
                                            }
                                      />
                                  </Pie>
                              </PieChart>
                          </ChartContainer>
                      </CardContent>
                  </Card>
              </div>
          </div>
    );
}