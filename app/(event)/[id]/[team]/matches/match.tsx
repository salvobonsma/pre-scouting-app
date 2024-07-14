import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";

export default function MatchView({orderedMatches, currentMatch, setCurrentMatch}: {
    orderedMatches: Match[],
    currentMatch?: string,
    setCurrentMatch: Dispatch<SetStateAction<string | undefined>>
}) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const inti = useRef(false);
    useEffect(() => {
        if (!inti.current && api != undefined) {
            api.scrollTo(orderedMatches.findIndex(value => value.key == currentMatch), true);
            inti.current = true;
        }
    }, [api, currentMatch, orderedMatches]);

    useEffect(() => {
        if (!api || !currentMatch) return;

        api.on("slidesInView", () => setCurrentMatch(orderedMatches[api.slidesInView()[0]].key));
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
                  {orderedMatches.map(value => (
                        <CarouselItem key={value.key}>
                            <div className={"border rounded-lg p-8"}>
                                {value.redScore}
                            </div>
                        </CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>
    );
}