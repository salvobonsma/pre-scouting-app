import {Dispatch, SetStateAction} from "react";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

export default function MatchView({orderedMatches, currentMatch, setCurrentMatch}: {
    orderedMatches: Match[],
    currentMatch?: string,
    setCurrentMatch: Dispatch<SetStateAction<string | undefined>>
}) {
    return (
          <Carousel className={"w-full"}>
              <CarouselContent>
                  {orderedMatches.map(value => (
                        <CarouselItem key={value.key}>{value.key}</CarouselItem>
                  ))}
              </CarouselContent>
          </Carousel>
    );
}