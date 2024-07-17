import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CarouselItem} from "@/components/ui/carousel";
import YoutubeEmbed from "@/components/youtube-embed";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import RichTextarea from "@/components/rich-textarea";
import React, {useEffect, useRef, useState} from "react";
import {MatchStatus} from "@/lib/database/set-match-statuses";
import {TeamStatus} from "@/lib/database/set-team-statues";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import UpdateMatchData from "@/lib/database/update-match-data";

export const matchDataSchema = z.object({
    notes: z.string(),
});

export default function MatchItem({
                                      match,
                                      teamsPerspective,
                                      setStatuses,
                                      statusStates,
                                      setChanges,
                                      submitted,
                                      setSubmitted,
                                      teamEntryId
                                  }: {
    match: Match,
    teamsPerspective: boolean,
    setStatuses: (status: MatchStatus, keys: string[]) => void,
    statusStates: { key: string, status: TeamStatus }[],
    setChanges: (changes: boolean) => void,
    submitted: boolean,
    setSubmitted: (submitted: boolean) => void,
    teamEntryId: number
}) {
    const [localChanges, setLocalChanges] = useState(false);

    const leftCol = (teamsPerspective && !match.friendlyAlliance ? match.blueTeamKeys : match.redTeamKeys).map(value => value.replace("frc", ""));
    const rightCol = (teamsPerspective && !match.friendlyAlliance ? match.redTeamKeys : match.blueTeamKeys).map(value => value.replace("frc", ""));

    const form = useForm<z.infer<typeof matchDataSchema>>({
        resolver: zodResolver(matchDataSchema),
        defaultValues: {
            notes: match.notes,
        }
    });

    const formRef = useRef<HTMLFormElement>(null);

    let lastSubmitStatus = useRef(submitted);
    useEffect(() => {
        if (!localChanges) return;
        if (submitted == lastSubmitStatus.current) return;

        if (statusStates.find(
              value => value.key == match.key
        )?.status ?? "notStarted" == "notStarted") setStatuses("inProgress", [match.key]);
        formRef.current?.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
        setSubmitted(false);

        lastSubmitStatus.current = submitted;
        setLocalChanges(false);
    }, [form, localChanges, match.key, setStatuses, setSubmitted, statusStates, submitted, teamEntryId]);

    let lastSave = form.getValues();
    form.watch(() => {
        const changes = JSON.stringify(form.getValues()) !== JSON.stringify(lastSave);
        setChanges(changes);
        setLocalChanges(changes);
    });

    return (
          <CarouselItem key={match.key}>
              <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(async values => {
                      await UpdateMatchData(match.key, teamEntryId, values)
                  })}>
                      <div className={"border rounded-lg p-4 gap-4 flex flex-col xl:flex-row"}>
                          <div className={"flex-1"}>
                              <YoutubeEmbed
                                    id={match.videoId}
                                    // id={null}
                                    match={match}
                                    className={"w-full aspect-video xl:h-full"}
                              />
                          </div>
                          <div className={"flex flex-col gap-4"}>
                              <div className={"flex flex-wrap gap-4 justify-center"}>
                                  <div className={"w-full sm:flex-1 h-fit"}>
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
                                          <div className={"sm:h-8"}/>
                                          <div className={"flex justify-between sm:justify-center"}>
                                              <p className={"sm:hidden muted"}>Current status</p>
                                              <StatusBadge status={statusStates.find(
                                                    value => value.key == match.key
                                              )?.status ?? "notStarted"}/>
                                          </div>
                                          <div className={"mt-4 flex justify-end"}>
                                              <DropdownMenu>
                                                  <DropdownMenuTrigger asChild>
                                                      <Button>Update Status</Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent side={"right"} align={"end"}>
                                                      <DropdownMenuItem
                                                            className={"justify-center"}
                                                            onClick={() => setStatuses("notStarted", [match.key])}
                                                      >
                                                          <StatusBadge status={"notStarted"}/>
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem
                                                            className={"justify-center"}
                                                            onClick={() => setStatuses("inProgress", [match.key])}
                                                      >
                                                          <StatusBadge status={"inProgress"}/>
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem
                                                            className={"justify-center"}
                                                            onClick={() => setStatuses("completed", [match.key])}
                                                      >
                                                          <StatusBadge status={"completed"}/>
                                                      </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                              </DropdownMenu>
                                          </div>
                                      </CardContent>
                                  </Card>
                              </div>
                              <Card className={"flex-1"}>
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
                                                            className={"h-32"}
                                                      />
                                                      <FormMessage/>
                                                  </FormItem>
                                            )}
                                      />
                                  </CardContent>
                              </Card>
                          </div>
                      </div>
                  </form>
              </Form>
          </CarouselItem>
    );
}