'use client'

import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import ThreatGrade, {fromIndex, getIndex} from "@/components/threat-grade";
import {Button} from "@/components/ui/button";
import {ArrowDown, ArrowUp} from "lucide-react";
import React, {useEffect, useState} from "react";
import SetThreatGrade, {ThreatGradeType} from "@/lib/database/set-threat-grade";

export default function ThreatGradeContainer({event, team, teamEntry}: {
    event: { id: number },
    team: { number: number },
    teamEntry: { threatGrade: string | null }
}) {
    const [carousel, setCarousel] = React.useState<CarouselApi>();
    const [upDisabled, setUpDisabled] = useState(false);
    const [downDisabled, setDownDisabled] = useState(false);

    useEffect(() => {
        if (!carousel) return;

        let lastSlide = carousel.slidesInView()[0];

        carousel.on("slidesInView", async () => {
            if (lastSlide == carousel.slidesInView()[0]) return;
            lastSlide = carousel.slidesInView()[0];

            setUpDisabled(carousel.slidesInView()[0] == 0);
            setDownDisabled(carousel.slidesInView()[0] == 5);

            await SetThreatGrade(event.id, team.number, fromIndex(carousel.slidesInView()[0]));
        });

        carousel.scrollTo(getIndex(teamEntry.threatGrade as ThreatGradeType), true);
        if (getIndex(teamEntry.threatGrade as ThreatGradeType) == 0) setUpDisabled(true);
    }, [carousel, event.id, team.number, teamEntry.threatGrade]);

    return (
          <>
              <Carousel orientation={"vertical"} setApi={setCarousel}>
                  <CarouselContent className={"h-24"}>
                      <CarouselItem><ThreatGrade size={"large"} grade={"A"}/></CarouselItem>
                      <CarouselItem><ThreatGrade size={"large"} grade={"B"}/></CarouselItem>
                      <CarouselItem><ThreatGrade size={"large"} grade={"C"}/></CarouselItem>
                      <CarouselItem><ThreatGrade size={"large"} grade={"D"}/></CarouselItem>
                      <CarouselItem><ThreatGrade size={"large"} grade={"E"}/></CarouselItem>
                      <CarouselItem><ThreatGrade size={"large"} grade={"F"}/></CarouselItem>
                  </CarouselContent>
              </Carousel>
              <div className={"flex flex-col"}>
                  <Button disabled={upDisabled} variant={"ghost"} onClick={() => carousel?.scrollPrev()}>
                      <ArrowUp/>
                  </Button>
                  <Button disabled={downDisabled} variant={"ghost"} onClick={() => carousel?.scrollNext()}>
                      <ArrowDown/>
                  </Button>
              </div>
          </>
    );
}