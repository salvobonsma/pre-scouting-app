import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import YoutubeEmbed from "@/components/youtube-embed";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import StatusBadge from "@/components/status-badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MatchStatus} from "@/lib/database/set-match-statuses";
import {TeamStatus} from "@/lib/database/set-team-statues";
import RichTextarea from "@/components/rich-textarea";


export default function MatchView({
                                      orderedMatches,
                                      currentMatch,
                                      setCurrentMatch,
                                      statusStates,
                                      setStatuses,
                                      teamsPerspective
                                  }: {
    teamsPerspective: boolean,
    orderedMatches: Match[],
    currentMatch?: string,
    setStatuses: (status: MatchStatus, keys: string[]) => void,
    statusStates: { key: string, status: TeamStatus }[],
    setCurrentMatch: Dispatch<SetStateAction<string | undefined>>
}) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [inView, setInView] = useState<number[]>([-1]);

    const inti = useRef(false);
    useEffect(() => {
        if (!inti.current && api != undefined) {
            api.scrollTo(orderedMatches.findIndex(value => value.key == currentMatch), true);
            inti.current = true;

            api.on("slidesInView", () => {
                console.log(api.slidesInView()[0])
                setCurrentMatch(orderedMatches[api.slidesInView()[0]].key);
                setInView(api.slidesInView());
            });
        }
    }, [api, currentMatch, orderedMatches, setCurrentMatch]);

    useEffect(() => {
        if (!api) return;
        const updateScrollButtons = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollButtons();
        api.on('scroll', updateScrollButtons);
        return () => {
            api.off('scroll', updateScrollButtons);
        };
    }, [api]);

    return (
          <Carousel className={"w-full"} setApi={setApi}>
              <div className={"flex gap-2 justify-between sm:justify-end my-4"}>
                  <Button disabled={!canScrollPrev} variant={"outline"} onClick={() => api?.scrollPrev()}>
                      <ArrowLeft/>
                  </Button>
                  <Button disabled={!canScrollNext} variant={"outline"} onClick={() => api?.scrollNext()}>
                      <ArrowRight/>
                  </Button>
              </div>
              <CarouselContent>
                  {orderedMatches.map((match, index) => {
                      const leftCol = (teamsPerspective && !match.friendlyAlliance ? match.blueTeamKeys : match.redTeamKeys).map(value => value.replace("frc", ""));
                      const rightCol = (teamsPerspective && !match.friendlyAlliance ? match.redTeamKeys : match.blueTeamKeys).map(value => value.replace("frc", ""));

                      return (
                            <CarouselItem key={match.key}>
                                <div className={"border rounded-lg p-4 gap-4 flex"}>
                                    <div className={"flex-1"}>
                                        <YoutubeEmbed
                                              // Make sure that nothing is loading or unloading during scrolling
                                              load={
                                                    inView.includes(index) ||
                                                    (inView.length == 1 && (inView[0] + 1 == index || inView[0] - 1 == index))
                                              }
                                              // id={match.videoId}
                                              id={null}
                                              match={match}
                                              className={"w-full h-full"}
                                        />
                                    </div>
                                    <div className={"flex flex-wrap gap-4"}>
                                        <div className={"w-fit h-fit"}>
                                            <Table className={"w-full text-center"}>
                                                <TableHeader>
                                                    <TableRow>
                                                        {
                                                            teamsPerspective ? (
                                                                  <>
                                                                      <TableHead className={"text-nowrap"}>Friendly
                                                                          Alliance</TableHead>
                                                                      <TableHead className={"text-nowrap"}>Opponent
                                                                          Alliance</TableHead>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                      <TableHead className={"text-nowrap"}>Red
                                                                          Alliance</TableHead>
                                                                      <TableHead className={"text-nowrap"}>Blue
                                                                          Alliance</TableHead>
                                                                  </>
                                                            )
                                                        }
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className={cn(
                                                              match.friendlyAlliance && !teamsPerspective ? "underline" : "",
                                                              match.winningAlliance == "blue" ? "font-bold" : ""
                                                        )}>{match.blueScore}</TableCell>
                                                        <TableCell className={cn(
                                                              !match.friendlyAlliance && !teamsPerspective ? "underline" : "",
                                                              match.winningAlliance == "red" ? "font-bold" : ""
                                                        )}>{match.redScore}</TableCell>
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
                                        <Card className={""}>
                                            <CardHeader>
                                                <CardTitle>Status</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className={"h-8"}/>
                                                <div className={"flex justify-center"}>
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
                                        <Card className={"flex-1"}>
                                            <CardHeader>
                                                <CardTitle>Notes</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <RichTextarea/>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>
                      );
                  })}
              </CarouselContent>
          </Carousel>
    );
}