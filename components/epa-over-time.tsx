import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {Match} from "@/app/[eventId]/[teamNumber]/matches/matches";

const chartConfig = {
    totalEPA: {
        label: "Total EPA",
        color: "var(--chart-1)"
    },
    autoEPA: {
        label: "Auto EPA",
    },
    teleopEPA: {
        label: "Teleop EPA",
    },
    endgameEPA: {
        label: "Endgame EPA",
    }
} satisfies ChartConfig

export default function EPAOverTime({matches, events}: {
    matches: Match[],
    events: { eventKey: string, name: string }[]
}) {
    const formatedMatches = [...matches]
          .filter(value => value.totalEPA >= 0)
          .sort((a, b) => a.startTime - b.startTime)
          .map(value => ({
              ...value,
              xAxis: `${events.find(value1 => value1.eventKey == value.eventKey)?.name ?? ""}\nMatch ${value.matchNumber}`
          }));

    return (
          <Card className={"mt-sm w-full xl:w-[65em]"}>
              <CardHeader className={"flex justify-between"}>
                  <CardTitle>EPA Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                  <ChartContainer className={"h-72 w-full"} config={chartConfig}>
                      <AreaChart
                            accessibilityLayer
                            data={formatedMatches}
                      >
                          <CartesianGrid vertical={false}/>
                          <ChartTooltip
                                content={
                                    <ChartTooltipContent labelFormatter={(value) => (
                                          <div className={"flex flex-col"}>
                                              <span>{value.split("\n")[0]}</span>
                                              <span>{value.split("\n")[1]}</span>
                                          </div>
                                    )} className={"w-40"}/>
                                }
                                cursor={false}
                          />
                          <XAxis
                                dataKey="xAxis"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.split("\n")[0]}
                          />
                          <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={5}
                          />
                          <Area
                                dataKey="totalEPA"
                                type="natural"
                                // dot={{
                                //     fill: "var(--chart-1)"
                                // }}
                                fillOpacity={0}
                                strokeOpacity={0}
                                fill="var(--chart-4)"
                                stroke=""
                                stackId="b"
                          />
                          <Area
                                dataKey="autoEPA"
                                type="natural"
                                // dot={{
                                //     fill: "var(--chart-1)"
                                // }}
                                fillOpacity={0.4}
                                fill="var(--chart-1)"
                                stroke="var(--chart-1)"
                                stackId="a"
                          />
                          <Area
                                dataKey="teleopEPA"
                                // dot={{
                                //     fill: "var(--chart-2)"
                                // }}
                                type="natural"
                                fillOpacity={0.4}
                                fill="var(--chart-2)"
                                stroke="var(--chart-2)"
                                stackId="a"
                          />
                          <Area
                                dataKey="endgameEPA"
                                type="natural"
                                // dot={{
                                //     fill: "var(--chart-3)"
                                // }}
                                fillOpacity={0.4}
                                fill="var(--chart-3)"
                                stroke="var(--chart-3)"
                                stackId="a"
                          />
                          <ChartLegend content={<ChartLegendContent/>}/>
                      </AreaChart>
                  </ChartContainer>
              </CardContent>
          </Card>
    );
}