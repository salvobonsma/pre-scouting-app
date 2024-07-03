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
import QuickTooltip from "@/components/quick-tooltip";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import UpdateTeamData from "@/lib/database/update-team-data";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
import KeyBindListener from "@/components/key-bind-listener";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import YoutubeEmbed from "@/components/youtube-embed";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

export default function ClientPage({event, team, teamEntry, teamDetails, statistics, events}: {
    event: { id: number },
    team: { rookieYear: number | null, state: string | null, school: string | null, number: number },
    teamEntry: {
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
    teamDetails: ReactNode,
    statistics: ReactNode,
    events: ReactNode
}) {
    const [status, setStatus] = useState(teamEntry.status as TeamStatus);

    const [loadingSave, setLoadingSave] = useState(false);
    const [changes, setChanges] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const formSchema = z.object({
        notes: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notes: teamEntry.notes,
        }
    });

    let lastSave = form.getValues();
    form.watch(() => setChanges(JSON.stringify(form.getValues()) !== JSON.stringify(lastSave)));

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoadingSave(true);
            if (status == "notStarted") await setTeamStatus("inProgress");
            await UpdateTeamData(event.id, team.number, {notes: values.notes});
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
                  <h1>{teamEntry.name}</h1>
                  <p className={"muted"}>Team {teamEntry.teamNumber}</p>
                  <Separator/>
                  <div className={"mt-sm flex flex-wrap gap-6"}>
                      {teamDetails}
                      <Card className={"w-full sm:w-fit"}>
                          <CardHeader>
                              <CardTitle><QuickTooltip trigger={"Threat Grade"} content={"Placeholder"}/>
                              </CardTitle>
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
                  <h1 className={"mt"}>Events</h1>
                  <Separator/>
                  <div className={"mt-sm flex flex-wrap gap-6"}>{events}</div>
                  <h1 className={"mt"}>Matches</h1>
                  <Separator/>
                  <Carousel>
                      <CarouselContent>
                          <CarouselItem>...</CarouselItem>
                          <CarouselItem>...</CarouselItem>
                          <CarouselItem>...</CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious/>
                      <CarouselNext/>
                  </Carousel>
                  <h1 className={"mt"}>Past Seasons</h1>
                  <Separator/>
                  <YoutubeEmbed
                  />
              </form>
          </Form>
    );
}