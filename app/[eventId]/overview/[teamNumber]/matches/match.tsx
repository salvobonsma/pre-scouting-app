import {CarouselItem} from "@/components/ui/carousel";
import YoutubeEmbed from "@/components/youtube-embed";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import RichTextarea from "@/components/rich-textarea";
import React from "react";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Match} from "@/app/[eventId]/overview/[teamNumber]/matches/matches";

export default function MatchItem({
                                      match,
                                      teamsPerspective,
                                      load
                                  }: {
    match: Match,
    teamsPerspective: boolean,
    load: boolean
}) {
    const leftCol = (teamsPerspective && !match.friendlyAlliance ? match.blueTeamKeys : match.redTeamKeys).map(value => value.replace("frc", ""));
    const rightCol = (teamsPerspective && !match.friendlyAlliance ? match.redTeamKeys : match.blueTeamKeys).map(value => value.replace("frc", ""));

    if (!load) return (<CarouselItem/>);

    const scouting = (
          <div className={"grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"}>
              <Card className={"border rounded-lg"}>
                  <CardHeader>
                      <CardTitle>Auto</CardTitle>
                  </CardHeader>
                  <CardContent className={"space-y-3"}>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"autoAmpScores"}>Amp Scores</Label>
                          <Input id={"autoAmpScores"} value={match.autoAmpScores}/>
                      </div>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"autoSpeakerScores"}>Speaker Scores</Label>
                          <Input id={"autoSpeakerScores"} value={match.autoSpeakerScores}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"leftStartingZone"}>Left Starting Zone</Label>
                          <Switch className={"mt-1"} id={"leftStartingZone"} checked={match.leftStartingZone}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"centerLineNote"}>Picked up Center Line Note</Label>
                          <Switch className={"mt-1"} id={"centerLineNote"} checked={match.centerLineNote}/>
                      </div>
                  </CardContent>
              </Card>
              <Card className={"border rounded-lg"}>
                  <CardHeader>
                      <CardTitle>Teleop</CardTitle>
                  </CardHeader>
                  <CardContent className={"space-y-3"}>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"teleopAmpScores"}>Amp Scores</Label>
                          <Input id={"teleopAmpScores"} value={match.teleopAmpScores}/>
                      </div>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"teleopSpeakerScores"}>Speaker Scores</Label>
                          <Input id={"teleopSpeakerScores"} value={match.teleopSpeakerScores}/>
                      </div>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"pickupFrom"}>Speaker Scores</Label>
                          <Input id={"pickupFrom"} value={
                              match.pickupFrom.length == 0 ?
                                    "Neither" :
                                    match.pickupFrom.map(value => value == "source" ? "Source" : "Ground").join(" & ")
                          }/>
                      </div>
                  </CardContent>
              </Card>
              <Card className={"border rounded-lg"}>
                  <CardHeader>
                      <CardTitle>Endgame</CardTitle>
                  </CardHeader>
                  <CardContent className={"space-y-3"}>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"finalStatus"}>Final Status</Label>
                          <Input id={"finalStatus"} value={
                              match.finalStatus == "parked" ? "Parked" : (
                                    match.finalStatus == "onstage" ? "Onstage" : (
                                          match.finalStatus == "attemptedAndFailed" ? "Attempted And Failed" : (
                                                "Not Attempted"
                                          )
                                    )
                              )
                          }/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"trap"}>Scored in Trap</Label>
                          <Switch className={"mt-1"} id={"trap"} checked={match.trap}/>
                      </div>
                  </CardContent>
              </Card>
              <Card className={"border rounded-lg"}>
                  <CardHeader>
                      <CardTitle>Miscellaneous</CardTitle>
                  </CardHeader>
                  <CardContent className={"space-y-3"}>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"driverSkill"}>Driver Skill</Label>
                          <Input id={"driverSkill"} value={
                              match.driverSkill == "effective" ? "Effective" : (match.driverSkill == "average" ? "Average" : "Not Effective")
                          }/>
                      </div>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"defenceSkill"}>Defence Skill</Label>
                          <Input id={"defenceSkill"} value={
                              match.defenceSkill == "effective" ? "Effective" : (match.defenceSkill == "average" ? "Average" : "Not Effective")
                          }/>
                      </div>
                      <div className={"space-y-2"}>
                          <Label htmlFor={"speed"}>Defence Skill</Label>
                          <Input id={"speed"} value={
                              match.speed == "fast" ? "Fast" : (match.speed == "average" ? "Average" : "Slow")
                          }/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"noteStuck"}>Note Stuck</Label>
                          <Switch className={"mt-1"} id={"noteStuck"} checked={match.noteStuck}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"noteDrop"}>Note Dropped</Label>
                          <Switch className={"mt-1"} id={"noteDrop"} checked={match.noteDrop}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"breakage"}>Breakage</Label>
                          <Switch className={"mt-1"} id={"breakage"} checked={match.breakage}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"immobilized"}>Immobilized</Label>
                          <Switch className={"mt-1"} id={"immobilized"} checked={match.immobilized}/>
                      </div>
                      <div className={"flex justify-between items-center"}>
                          <Label htmlFor={"tippy"}>Tippy</Label>
                          <Switch className={"mt-1"} id={"tippy"} checked={match.tippy}/>
                      </div>
                  </CardContent>
              </Card>
          </div>
    );

    return (
          <CarouselItem key={match.key}>
              <div className={"border rounded-lg p-4 flex flex-col gap-4"}>
                  <div className={"gap-4 flex flex-col xl:flex-row"}>
                      <div className={"flex-1"}>
                          <YoutubeEmbed
                                id={match.videoId}
                                match={match}
                                className={"w-full aspect-video xl:h-full border shadow-sm"}
                          />
                      </div>
                      <div className={"flex flex-col gap-4"}>
                          <div className={"flex flex-wrap gap-4 justify-center"}>
                              <div className={"w-full sm:flex-1 h-fit shadow-sm"}>
                                  <Table className={"w-full text-center"}>
                                      <TableHeader>
                                          <TableRow>
                                              {
                                                  teamsPerspective ? (
                                                        <>
                                                            <TableHead className={"text-nowrap text-center"}>
                                                                Friendly Alliance
                                                            </TableHead>
                                                            <TableHead className={"text-nowrap text-center"}>
                                                                Opponent Alliance
                                                            </TableHead>
                                                        </>
                                                  ) : (
                                                        <>
                                                            <TableHead className={"text-nowrap text-center"}>
                                                                Red Alliance
                                                            </TableHead>
                                                            <TableHead className={"text-nowrap text-center"}>
                                                                Blue Alliance
                                                            </TableHead>
                                                        </>
                                                  )
                                              }
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          <TableRow>
                                              <TableCell className={cn(
                                                    match.friendlyAlliance && !teamsPerspective ? "underline" : "",
                                                    (teamsPerspective && !match.friendlyAlliance ? match.winningAlliance == "red" : match.winningAlliance == "blue") ? "" : "font-bold"
                                              )}>{teamsPerspective && !match.friendlyAlliance ? match.blueScore : match.redScore}</TableCell>
                                              <TableCell className={cn(
                                                    !match.friendlyAlliance && !teamsPerspective ? "underline" : "",
                                                    (teamsPerspective && !match.friendlyAlliance ? match.winningAlliance == "blue" : match.winningAlliance == "red") ? "" : "font-bold"
                                              )}>{teamsPerspective && !match.friendlyAlliance ? match.redScore : match.blueScore}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>{leftCol[0]}</TableCell>
                                              <TableCell>{rightCol[0]}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>{leftCol[1]}</TableCell>
                                              <TableCell>{rightCol[1]}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>{leftCol[2]}</TableCell>
                                              <TableCell>{rightCol[2]}</TableCell>
                                          </TableRow>
                                      </TableBody>
                                  </Table>
                              </div>
                              <Card className={"w-full sm:w-fit"}>
                                  <CardHeader>
                                      <CardTitle>Status</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <div className={"sm:h-14"}/>
                                      <div className={"flex justify-between sm:justify-center"}>
                                          <p className={"sm:hidden muted"}>Current status</p>
                                          <StatusBadge status={match.status}/>
                                      </div>
                                  </CardContent>
                              </Card>
                          </div>
                          <Card className={"flex-1"}>
                              {
                                  match.notes == "[{\"children\":[{\"text\":\"\"}],\"type\":\"p\"}]" ? (
                                        <>
                                            <CardHeader className={"pb-0"}>
                                                <CardTitle>Notes</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className={"flex items-center justify-center h-[9.5em]"}>
                                                    <p className={"muted"}>No notes recorded.</p>
                                                </div>
                                            </CardContent>
                                        </>
                                  ) : (
                                        <>
                                            <CardHeader>
                                                <CardTitle>Notes</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <RichTextarea
                                                      initialValue={JSON.parse(match.notes)}
                                                      readOnly
                                                      className={"h-32"}
                                                />
                                            </CardContent>
                                        </>
                                  )
                              }
                          </Card>
                      </div>
                  </div>
                  {!match.record ? (
                        <p className={"muted text-center m-6"}>
                            No scouting data recorded for this match.
                        </p>
                  ) : (scouting)}
              </div>
          </CarouselItem>
    );
}