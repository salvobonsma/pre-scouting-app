import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Match} from "@/app/[eventId]/[teamNumber]/matches/matches";
import {Carousel, CarouselApi, CarouselContent} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {MatchStatus} from "@/lib/database/set-match-statuses";
import {TeamStatus} from "@/lib/database/set-team-statues";
import {z} from "zod";
import MatchItem from "@/app/[eventId]/[teamNumber]/matches/match";

export const matchDataSchema = z.object({
    notes: z.string(),
});

export default function MatchView({
                                      orderedMatches,
                                      currentMatch,
                                      setCurrentMatch,
                                      statusStates,
                                      setStatuses,
                                      teamsPerspective,
                                      setChanges,
                                      submitted,
                                      setSubmitted,
                                      teamEntryId
                                  }: {
    teamsPerspective: boolean,
    orderedMatches: Match[],
    currentMatch?: string,
    setStatuses: (status: MatchStatus, keys: string[]) => void,
    statusStates: { key: string, status: TeamStatus }[],
    setCurrentMatch: Dispatch<SetStateAction<string | undefined>>,
    setChanges: (changes: boolean) => void,
    submitted: boolean,
    setSubmitted: (submitted: boolean) => void
    teamEntryId: number
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
                  <Button type={"button"} disabled={!canScrollPrev} variant={"outline"}
                          onClick={() => api?.scrollPrev()}>
                      <ArrowLeft/>
                  </Button>
                  <Button type={"button"} disabled={!canScrollNext} variant={"outline"}
                          onClick={() => api?.scrollNext()}>
                      <ArrowRight/>
                  </Button>
              </div>
              <CarouselContent>
                  {orderedMatches.map((match, index) => (
                        <MatchItem
                              key={match.key}
                              match={match}
                              teamsPerspective={teamsPerspective}
                              statusStates={statusStates}
                              setStatuses={setStatuses}
                              setChanges={setChanges}
                              submitted={submitted}
                              setSubmitted={setSubmitted}
                              teamEntryId={teamEntryId}
                              load={inView.includes(index) || (inView.length == 1 && (inView[0] + 1 == index || inView[0] - 1 == index))}
                        />
                  ))}
              </CarouselContent>
          </Carousel>
    );
}