import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {Separator} from "@/components/ui/separator";
import React, {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import StatusBadge from "@/components/status-badge";
import {Badge} from "@/components/ui/badge";
import SetMatchStatuses, {MatchStatus} from "@/lib/database/set-match-statuses";
import {SortingState, VisibilityState} from "@tanstack/react-table";
import Table from "@/app/[eventId]/[teamNumber]/matches/table";
import MatchView from "@/app/[eventId]/[teamNumber]/matches/matchView";

export type Match = {
    key: string,
    totalEPA: number,
    autoEPA: number,
    teleopEPA: number,
    endgameEPA: number,
    eventKey: string,
    matchNumber: number,
    winningAlliance: "red" | "blue" | "",
    compLevel: "qm" | "ef" | "qf" | "sf" | "f",
    scoreBreakdown: String,
    startTime: number
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
}

export default function Matches({matches, teamEntryId, setChanges, submitted, setSubmitted}: {
    matches: Match[],
    teamEntryId: number,
    setChanges: (changes: boolean) => void,
    submitted: boolean,
    setSubmitted: (submitted: boolean) => void
}) {
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        key: false,
        friendlyAlliance: false,
        redScore: false,
        blueScore: false
    });
    const [teamsPerspective, setTeamsPerspective] = useState(true);
    const [statusStates, setStatusStates] = useState(
          matches.map(match => ({key: match.key ?? 0, status: match.status as MatchStatus}))
    );
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

    let progress = statusStates.map(value => +(value.status == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    ) / matches.length * 100;
    progress = isNaN(progress) ? 0 : progress;
    const notStarted = statusStates.map(value => +(value.status == "notStarted" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const inProgress = statusStates.map(value => +(value.status == "inProgress" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );
    const completed = statusStates.map(value => +(value.status == "completed" ? +1 : +0)).reduce(
          (previousValue, currentValue) => previousValue + currentValue, 0
    );

    async function setStatuses(status: MatchStatus, keys: string[]) {
        setStatusStates(await SetMatchStatuses(status, teamEntryId, keys));
    }

    const progressComponent = (
          <Card className={"mt-4 w-full"}>
              <CardHeader className={"md:hidden"}><CardTitle>Progress</CardTitle></CardHeader>
              <CardContent className={"md:flex items-center gap-6 md:p-1"}>
                  <div className={"md:ml-6 flex-1"}>
                      <div className={"md:w-full flex items-center gap-3"}>
                          <Progress value={progress} className={"w-full"}/>
                          <p className={"font-semi-bold"}>{progress.toFixed()}%</p>
                      </div>
                  </div>
                  <div className={"hidden md:block"}>{/*Hidden and flex not compatible*/}
                      <div className={"flex justify-between my-4 gap-1 h-16 text-center md:mr-4"}>
                          <div className={"m-2"}>
                              <StatusBadge status={"notStarted"}/>
                              <p>{notStarted}</p>
                          </div>
                          <Separator orientation={"vertical"}/>
                          <div className={"m-2"}>
                              <StatusBadge status={"inProgress"}/>
                              <p>{inProgress}</p>
                          </div>
                          <Separator orientation={"vertical"}/>
                          <div className={"m-2"}>
                              <StatusBadge status={"completed"}/>
                              <p>{completed}</p>
                          </div>
                          <Separator orientation={"vertical"}/>
                          <div className={"m-2"}>
                              <Badge variant={"outline"}>Total</Badge>
                              <p>{matches.length}</p>
                          </div>
                      </div>
                  </div>
                  <div className={"block md:hidden"}>{/*Hidden and flex not compatible*/}
                      <div className={"flex justify-around my-4 gap-4 text-center flex-wrap"}>
                          <div className={"flex gap-2"}>
                              <StatusBadge status={"notStarted"}/>
                              <p>{notStarted}</p>
                          </div>
                          <div className={"flex gap-2"}>
                              <StatusBadge status={"inProgress"}/>
                              <p>{inProgress}</p>
                          </div>
                          <div className={"flex gap-2"}>
                              <StatusBadge status={"completed"}/>
                              <p>{completed}</p>
                          </div>
                          <div className={"flex gap-2"}>
                              <Badge variant={"outline"}>Total</Badge>
                              <p>{matches.length}</p>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card>
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
              {progressComponent}
              <TabsContent value={"table"}>
                  <Table
                        data={matches}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                        statusStates={statusStates}
                        setStatusStates={setStatusStates}
                        setOrderedMatches={setOrderedMatches}
                        setCurrentMatch={setCurrentMatch}
                        sorting={sorting}
                        setSorting={setSorting}
                        setTab={setTab}
                        setStatuses={setStatuses}
                        teamEntryId={teamEntryId}
                  />
              </TabsContent>
              <TabsContent value={"match"}>
                  <MatchView
                        teamsPerspective={teamsPerspective}
                        orderedMatches={orderedMatches}
                        currentMatch={currentMatch}
                        setCurrentMatch={setCurrentMatch}
                        statusStates={statusStates}
                        setStatuses={setStatuses}
                        setChanges={setChanges}
                        submitted={submitted}
                        setSubmitted={setSubmitted}
                        teamEntryId={teamEntryId}
                  />
              </TabsContent>
          </Tabs>
    );
}