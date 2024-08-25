import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useState} from "react";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {Team, TeamEvent} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function EPAOverTime({a, b}: {
    a: {
        team: Team,
        matches: any[],
        events: TeamEvent[]
    },
    b: {
        team: Team,
        matches: any[],
        events: TeamEvent[]
    }
}) {
    const [type, setType] = useState("totalEPA");

    const chartConfig = {
        a: {
            label: a.team.number
        },
        b: {
            label: b.team.number
        }
    } satisfies ChartConfig

    const matches = [
        ...a.matches.map(value => ({...value, type: "a"})),
        ...b.matches.map(value => ({...value, type: "b"}))
    ].filter(value => value.totalEPA >= 0).sort((a, b) => a.startTime - b.startTime);

    const chart: any[] = [];
    let lastA: number | undefined = undefined;
    let lastB: number | undefined = undefined;

    matches.forEach(value => {
        if (value.type === "a") {
            lastA = value[type];
        } else if (value.type === "b") {
            lastB = value[type];
        }

        chart.push({
            time: value.startTime,
            a: lastA,
            b: lastB
        });
    });

    return (
          <Card className={"mt-sm w-full"}>
              <CardHeader>
                  <div className={"flex justify-between items-center"}>
                      <CardTitle>EPA Over Time</CardTitle>
                      <Select value={type} onValueChange={setType}>
                          <SelectTrigger className={"w-40"}>
                              <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value={"totalEPA"}>Total EPA</SelectItem>
                              <SelectItem value={"autoEPA"}>Auto EPA</SelectItem>
                              <SelectItem value={"teleopEPA"}>Teleop EPA</SelectItem>
                              <SelectItem value={"endgameEPA"}>Endgame EPA</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </CardHeader>
              <CardContent>
                  <ChartContainer className={"h-72 w-full"} config={chartConfig}>
                      <LineChart
                            accessibilityLayer
                            data={chart}
                      >
                          <CartesianGrid vertical={false}/>
                          <ChartTooltip
                                content={
                                    <ChartTooltipContent className={"w-40"}/>
                                }
                                labelFormatter={(value) => {
                                    return new Date(value * 1000).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true
                                    }).replace(" at ", ", ");
                                }}
                                cursor={false}
                          />
                          <XAxis
                                dataKey="time"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => {
                                    return `${
                                          new Date(value * 1000).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric"
                                          })
                                    }    `;
                                }}
                          />
                          <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={5}
                          />
                          <Line
                                dataKey="a"
                                type="natural"
                                stroke="var(--chart-1)"
                                strokeWidth={2}
                                dot={false}
                          />
                          <Line
                                dataKey="b"
                                type="natural"
                                stroke="var(--chart-2)"
                                strokeWidth={2}
                                dot={false}
                          />
                          <ChartLegend content={<ChartLegendContent/>}/>
                      </LineChart>
                  </ChartContainer>
              </CardContent>
          </Card>
    );
}