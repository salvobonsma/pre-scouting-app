import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import YoutubeEmbed from "@/components/youtube-embed";

export default function MatchView({orderedMatches, currentMatch, setCurrentMatch}: {
    orderedMatches: Match[],
    currentMatch?: string,
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
                  {orderedMatches.map((value, index) => (
                        <CarouselItem key={value.key}>
                            <div className={"border rounded-lg"}>
                                <YoutubeEmbed
                                      // Make sure that nothing is loading or unloading during scrolling
                                      load={
                                            inView.includes(index) ||
                                            (inView.length == 1 && (inView[0] + 1 == index || inView[0] - 1 == index))
                                      }
                                      id={value.videoId}
                                      match={value}
                                      className={"w-full"}
                                />
                            </div>
                        </CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>
    );
}