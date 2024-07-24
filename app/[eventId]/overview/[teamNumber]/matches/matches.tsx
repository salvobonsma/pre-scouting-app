import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {Separator} from "@/components/ui/separator";
import React, {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {MatchStatus} from "@/lib/database/set-match-statuses";
import {SortingState, VisibilityState} from "@tanstack/react-table";
import Table from "./table";
import MatchView from "./matchView";

export type Match = {
    key: string,
    eventKey: string,
    matchNumber: number,
    winningAlliance: "red" | "blue" | "",
    compLevel: "qm" | "ef" | "qf" | "sf" | "f",
    scoreBreakdown: string,
    startTime: number,
    redScore: number,
    redTeamKeys: string[],
    blueScore: number,
    blueTeamKeys: string[],
    friendlyScore: number,
    opponentScore: number,
    videoId: string | null,
    friendlyAlliance: boolean,
    notes: string,
    startedScouting: boolean,
    record: boolean,
    status: MatchStatus,
    autoAmpScores: number,
    autoSpeakerScores: number,
    leftStartingZone: boolean,
    centerLineNote: boolean,
    teleopAmpScores: number,
    teleopSpeakerScores: number,
    pickupFrom: ("source" | "ground")[],
    finalStatus: "parked" | "onstage" | "attemptedAndFailed" | "notAttempted",
    trap: boolean,
    driverSkill: "effective" | "average" | "notEffective",
    defenceSkill: "effective" | "average" | "notEffective",
    speed: "fast" | "average" | "slow",
    noteStuck: boolean,
    noteDrop: boolean,
    breakage: boolean,
    immobilized: boolean,
    tippy: boolean
}

export default function Matches({matches}: {
    matches: Match[]
}) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        key: false,
        friendlyAlliance: false,
        redScore: false,
        blueScore: false
    });
    const [teamsPerspective, setTeamsPerspective] = useState(true);
    const [tab, setTab] = useState("table");
    const [orderedMatches, setOrderedMatches] = useState<Match[]>([]);
    const [currentMatch, setCurrentMatch] =
          useState<string | undefined>(undefined);
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "status",
            desc: true
        },
        {
            id: "startTime",
            desc: true
        }
    ]);

    if (matches.length == 0) return (
          <>
              <h1 className={"mt"}>Matches</h1>
              <Separator/>
              <p className={"text-center muted mt-8"}>
                  This team has not competed in any matches this season, yet.
              </p>
          </>
    );

    return (
          <Tabs value={tab} onValueChange={setTab}>
              <div className={"flex gap-4 items-center mt"}>
                  <h1>Matches</h1>
                  <div className={"flex-1"}/>
                  <div className={"hidden sm:block"}>
                      <div className="flex items-center space-x-2 translate-y-[-3px]">
                          <Label htmlFor="perspective">{"From team's perspective"}</Label>
                          <Switch
                                checked={teamsPerspective}
                                onCheckedChange={checked => {
                                    setTeamsPerspective(checked);
                                    if (checked) {
                                        setColumnVisibility(
                                              {
                                                  key: false,
                                                  friendlyAlliance: false,
                                                  redScore: false,
                                                  blueScore: false
                                              }
                                        );
                                    } else {
                                        setColumnVisibility(
                                              {
                                                  key: false,
                                                  friendlyAlliance: false,
                                                  friendlyScore: false,
                                                  opponentScore: false
                                              }
                                        )
                                    }
                                }}
                                id="perspective"
                          />
                      </div>
                  </div>
                  <TabsList className={"hidden sm:block translate-y-[-3px]"}>
                      <TabsTrigger value={"table"}>Table</TabsTrigger>
                      <TabsTrigger value={"match"}>Match</TabsTrigger>
                  </TabsList>
              </div>
              <Separator/>
              <div className={"sm:hidden"}>
                  <div className="flex justify-between items-center mx-1 mt-sm">
                      <Label htmlFor="perspective">{"From team's perspective"}</Label>
                      <Switch defaultChecked id="perspective"/>
                  </div>
              </div>
              <TabsList className={"sm:hidden w-full mt-4"}>
                  <TabsTrigger className={"flex-1"} value={"table"}>Table</TabsTrigger>
                  <TabsTrigger className={"flex-1"} value={"match"}>Match</TabsTrigger>
              </TabsList>
              <TabsContent value={"table"}>
                  <Table
                        data={matches}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        setOrderedMatches={setOrderedMatches}
                        setCurrentMatch={setCurrentMatch}
                        sorting={sorting}
                        setSorting={setSorting}
                        setTab={setTab}
                  />
              </TabsContent>
              <TabsContent value={"match"}>
                  <MatchView
                        teamsPerspective={teamsPerspective}
                        orderedMatches={orderedMatches}
                        currentMatch={currentMatch}
                        setCurrentMatch={setCurrentMatch}
                  />
              </TabsContent>
          </Tabs>
    );
}