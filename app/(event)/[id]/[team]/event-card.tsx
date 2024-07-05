import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import React from "react";

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
              <CardContent>
                  <div className={"flex flex-wrap sm:grid sm:grid-cols-2 gap-y-6 gap-x-8"}>
                      {/*<div className={"w-full"}>*/}
                      {/*    <h2>Results</h2>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted"}>Event rank</p>*/}
                      {/*        <p>7th <span className={"muted"}>of 34</span></p>*/}
                      {/*    </div>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted"}>Record</p>*/}
                      {/*        <QuickTooltip*/}
                      {/*              trigger={<p>9-6-0</p>}*/}
                      {/*              content={*/}
                      {/*                  <div className={"w-20"}>*/}
                      {/*                      <div className={"flex justify-between"}>*/}
                      {/*                          <p className={"muted"}>Wins</p>*/}
                      {/*                          <p>9</p>*/}
                      {/*                      </div>*/}
                      {/*                      <div className={"flex justify-between"}>*/}
                      {/*                          <p className={"muted"}>Losses</p>*/}
                      {/*                          <p>6</p>*/}
                      {/*                      </div>*/}
                      {/*                      <div className={"flex justify-between"}>*/}
                      {/*                          <p className={"muted"}>Ties</p>*/}
                      {/*                          <p>0</p>*/}
                      {/*                      </div>*/}
                      {/*                  </div>*/}
                      {/*              }*/}
                      {/*        />*/}
                      {/*    </div>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted text-nowrap mr-1"}>Awards</p>*/}
                      {/*        <div>*/}
                      {/*            <p className={"text-right"}>Rookie All Star</p>*/}
                      {/*            <p className={"text-right"}>Rookie All Star</p>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                      {/*<div className={"w-full"}>*/}
                      {/*    <h2>Playoffs</h2>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted"}>Alliance</p>*/}
                      {/*        <p>Alliance 3</p>*/}
                      {/*    </div>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted"}>Alliance role</p>*/}
                      {/*        <p>Captain</p>*/}
                      {/*    </div>*/}
                      {/*    <div className={"flex justify-between"}>*/}
                      {/*        <p className={"muted"}>Eliminated at</p>*/}
                      {/*        <p>Round 3</p>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                      {/*<div className={"w-full"}>*/}
                      {/*    <h2>Playoffs</h2>*/}
                      {/*    <div className={"flex justify-center"}>*/}
                      {/*        <p className={"muted"}>Did not qualify</p>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                  </div>
                  {/*<div className={"flex justify-center"}>*/}
                  {/*    <p className={"muted"}>Event has not concluded, yet.</p>*/}
                  {/*</div>*/}
                  {/*<div className={"flex flex-col gap-2 items-center"}>*/}
                  {/*    /!*<p className={"muted"}>Event has not concluded, yet.</p>*!/*/}
                  {/*    <p className={"muted"}>No data available.</p>*/}
                  {/*    <Button>Update Data</Button>*/}
                  {/*</div>*/}
              </CardContent>
          </Card>
    );
}