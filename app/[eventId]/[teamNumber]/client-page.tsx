'use client'

import Back from "@/components/back";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import SetTeamStatues, {TeamStatus} from "@/lib/database/set-team-statues";
import React, {ReactNode, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import ThreatGradeContainer from "@/components/threat-grade-container";
import RichTextarea from "@/components/rich-textarea";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import UpdateTeamData from "@/lib/database/update-team-data";
import {ArrowLeftRight, Loader2, MoreVertical, ScanEye} from "lucide-react";
import {cn} from "@/lib/utils";
import KeyBindListener from "@/components/key-bind-listener";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import Matches, {Match} from "@/app/[eventId]/[teamNumber]/matches/matches";
import EPAOverTime from "@/components/epa-over-time";

export const teamDataSchema = z.object({
    notes: z.string(),
});

export default function ClientPage({
                                       event,
                                       team,
                                       teamEntry,
                                       teamDetails,
                                       statistics,
                                       events,
                                       eventsList,
                                       pastSeasons,
                                       matches
                                   }: {
    event: { id: number },
    team: { rookieYear: number | null, state: string | null, school: string | null, number: number },
    teamEntry: {
        id: number,
        teamNumber: number | null,
        name: string | null,
        status: string,
        threatGrade: string | null,
        wins: number | null,
        ties: number | null,
        losses: number | null,
        worldRank: number | null
        worldTotal: number
        countyRank: number | null
        countyTotal: number
        districtRank: number | null
        districtTotal: number
        eventRank: number | null,
        eventTotal: number
        autoEPA: number | null,
        teleopEPA: number | null,
        endgameEPA: number | null,
        totalEPA: number | null,
        autoDeviation: number | null,
        teleopDeviation: number | null,
        endgameDeviation: number | null,
        totalDeviation: number | null,
        notes: string
    },
    matches: Match[],
    teamDetails: ReactNode,
    statistics: ReactNode,
    events: ReactNode,
    eventsList: { eventKey: string, name: string }[]
    pastSeasons: ReactNode
}) {
    const [status, setStatus] = useState(teamEntry.status as TeamStatus);

    const [loadingSave, setLoadingSave] = useState(false);
    const [changes, setChanges] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const form = useForm<z.infer<typeof teamDataSchema>>({
        resolver: zodResolver(teamDataSchema),
        defaultValues: {
            notes: teamEntry.notes
        }
    });

    let lastSave = form.getValues();
    form.watch(() => setChanges(JSON.stringify(form.getValues()) !== JSON.stringify(lastSave)));

    async function onSubmit(values: z.infer<typeof teamDataSchema>) {
        try {
            setSubmitted(true);
            setLoadingSave(true);
            if (status == "notStarted") await setTeamStatus("inProgress");
            await UpdateTeamData(event.id, team.number, values);
            lastSave = form.getValues();
            setChanges(false);
            setLoadingSave(false);
        } catch (e) {
            setError("Save error, try refreshing.");
        }
    }

    async function setTeamStatus(status: TeamStatus) {
        setStatus(status);
        await SetTeamStatues(event.id, [team.number], status);
    }

    return (
          <>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className={cn(
                            "z-[100] fixed bottom-0 right-0 p-3 w-full sm:w-96 ease-in-out transition-transform",
                            changes ? "" : "translate-x-full"
                      )}>
                          <div className={"border rounded-lg bg-background p-2 flex justify-between"}>
                              <div className={"ml-2 self-center"}>
                                  <p className={"self-center font-semibold"}>Save Changes</p>
                                  <KeyBindListener targetKey={"s"} callback={form.handleSubmit(onSubmit)}/>
                                  <p className={"text-sm text-destructive"}>{error}</p>
                              </div>
                              <Tooltip>
                                  <TooltipTrigger asChild type="button">
                                      <Button type={"submit"} disabled={loadingSave} className={"self-center"}>
                                          {loadingSave && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                                          Save
                                      </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>⌘+S</TooltipContent>
                              </Tooltip>
                          </div>
                      </div>

                      <Back link={`/${event.id}`} display={"Event"}/>
                      <div className={"flex justify-between items-center gap-1"}>
                          <div>
                              <h1>{teamEntry.name}</h1>
                              <p className={"muted"}>Team {teamEntry.teamNumber}</p>
                          </div>
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size={"icon"} className={"mx-2"}>
                                      <MoreVertical/>
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align={"end"}>
                                  <a href={`/${event.id}/overview/${team.number}`}>
                                      <DropdownMenuItem>
                                          <ScanEye className="mr-2 h-4 w-4"/>
                                          View Overview
                                      </DropdownMenuItem>
                                  </a>
                                  <a href={`/${event.id}/overview/compare?a=${team.number}`}>
                                      <DropdownMenuItem>
                                          <ArrowLeftRight className="mr-2 h-4 w-4"/>
                                          Compare
                                      </DropdownMenuItem>
                                  </a>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </div>
                      <Separator/>
                      <div className={"mt-sm flex flex-wrap gap-6"}>
                          {teamDetails}
                          <Card className={"w-full sm:w-fit"}>
                              <CardHeader>
                                  <CardTitle>Threat Grade</CardTitle>
                              </CardHeader>
                              <CardContent className={"flex gap-4"}>
                                  <ThreatGradeContainer event={event} team={team} teamEntry={teamEntry}/>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-80"}>
                              <CardHeader>
                                  <CardTitle>Status</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <div className={"flex justify-between"}>
                                      <p className={"muted"}>Current Status</p>
                                      <StatusBadge status={status}/>
                                  </div>
                                  <div className={"mt-4 flex justify-end"}>
                                      <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                              <Button>Update Status</Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent side={"right"} align={"end"}>
                                              <DropdownMenuItem
                                                    className={"justify-center"}
                                                    onClick={() => setTeamStatus("notStarted")}
                                              >
                                                  <StatusBadge status={"notStarted"}/>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                    className={"justify-center"}
                                                    onClick={() => setTeamStatus("inProgress")}
                                              >
                                                  <StatusBadge status={"inProgress"}/>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                    className={"justify-center"}
                                                    onClick={() => setTeamStatus("completed")}
                                              >
                                                  <StatusBadge status={"completed"}/>
                                              </DropdownMenuItem>
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                  </div>
                              </CardContent>
                          </Card>
                          <Card className={"w-full sm:w-[45em]"}>
                              <CardHeader>
                                  <CardTitle>Notes</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <FormField
                                        control={form.control}
                                        name="notes"
                                        render={() => (
                                              <FormItem>
                                                  <RichTextarea
                                                        initialValue={JSON.parse(form.getValues().notes)}
                                                        onChange={value => {
                                                            form.setValue("notes", JSON.stringify(value))
                                                        }}
                                                  />
                                                  <FormMessage/>
                                              </FormItem>
                                        )}
                                  />
                              </CardContent>
                          </Card>
                      </div>
                      <h1 className={"mt"}>Statistics</h1>
                      <Separator/>
                      {statistics}
                      {
                            matches.length != 0 && (
                                  <div className={"mt-sm"}><EPAOverTime matches={matches} events={eventsList}/></div>
                            )
                      }
                      <h1 className={"mt"}>Events</h1>
                      <Separator/>
                      {events}
                  </form>
              </Form>
              <Matches
                    matches={matches}
                    teamEntryId={teamEntry.id}
                    setChanges={setChanges}
                    submitted={submitted}
                    setSubmitted={setSubmitted}
              />
              {pastSeasons}
          </>
    );
}