"use client"

import {Bar, BarChart, CartesianGrid} from "recharts"

import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {TeamEntry} from "@prisma/client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";

export default function OverviewCharts({teamEntries}: { teamEntries: TeamEntry[] }) {
    const [sortedTeamEntries, setSortedTeamEntries] = useState<TeamEntry[] | undefined>();
    const [sorting, setSorting] = useState("default");
    const [order, setOrder] = useState("ascending");

    useEffect(() => {
        const sortedEntries = [...teamEntries]; // Create a copy of the teamEntries array
        switch (sorting) {
            case "default":
                setSortedTeamEntries(undefined);
                break;
            case "autoEPA":
                sortedEntries.sort((a, b) =>
                      (a.autoEPA ?? 0) - ((b.autoEPA ?? 0) * (order === "ascending" ? 1 : -1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "teleopEPA":
                sortedEntries.sort((a, b) =>
                      (a.teleopEPA ?? 0) - ((b.teleopEPA ?? 0) * (order === "ascending" ? 1 : -1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "endgameEPA":
                sortedEntries.sort((a, b) =>
                      (a.endgameEPA ?? 0) - ((b.endgameEPA ?? 0) * (order === "ascending" ? 1 : -1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "totalEPA":
                sortedEntries.sort((a, b) =>
                      (a.totalEPA ?? 0) - ((b.totalEPA ?? 0) * (order === "ascending" ? 1 : -1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "threatGrade":
                sortedEntries.sort((a, b) =>
                      (threadGradeIndex(a.threatGrade ?? "") - (threadGradeIndex(b.threatGrade ?? "")) * (order === "ascending" ? -1 : 1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "winrate":
                sortedEntries.sort((a, b) =>
                      winrate(a) - (winrate(b) * (order === "ascending" ? 1 : -1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
            case "worldRank":
                sortedEntries.sort((a, b) =>
                      (a.worldRank ?? 0) - ((b.worldRank ?? 0) * (order === "ascending" ? -1 : 1))
                );
                setSortedTeamEntries(sortedEntries);
                break;
        }
    }, [order, sorting, teamEntries]);

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

    function chart(config: ChartConfig, data: any[], dataKey: string) {
        return (
              <ChartContainer config={config} className="h-48 w-full">
                  <BarChart accessibilityLayer data={data}>
                      <CartesianGrid vertical={false}/>
                      <ChartTooltip content={<ChartTooltipContent labelKey={"teamNumber"} indicator={"line"}/>}/>
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
                          <SelectItem value="threatGrade">Threat Grade</SelectItem>
                          <SelectItem value="winrate">Winrate</SelectItem>
                          <SelectItem value="worldRank">World Rank</SelectItem>
                      </SelectContent>
                  </Select>
                  <Select value={order} onValueChange={setOrder}>
                      <SelectTrigger className="w-32">
                          <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="ascending">Ascending</SelectItem>
                          <SelectItem value="descending">Descending</SelectItem>
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
                                (a.autoEPA ?? 0) - ((b.autoEPA ?? 0) * (order === "ascending" ? 1 : -1))
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
                                (a.teleopEPA ?? 0) - ((b.teleopEPA ?? 0) * (order === "ascending" ? 1 : -1))
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
                                (a.endgameEPA ?? 0) - ((b.endgameEPA ?? 0) * (order === "ascending" ? 1 : -1))
                          ), "endgameEPA")}
                      </CardContent>
                  </Card>
              </div>
          </div>
    );
}