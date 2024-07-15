'use client'

import YouTube from "react-youtube";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useMeasure} from "@uidotdev/usehooks";
import {Match} from "@/app/(event)/[id]/[team]/matches/matches";
import {GetEvent} from "@/lib/database/get-event";

export default function YoutubeEmbed({load, id, match, className}: {
    load: boolean,
    id: string | null,
    match: Match,
    className?: string
}) {
    const [ref, {width, height}] = useMeasure();

    return (
          <>
              {id ? (
                    load ? (
                          <div ref={ref} className={cn(className, "rounded overflow-hidden")}>
                              <YouTube
                                    opts={{
                                        width: width || 0,
                                        height: height,
                                        playerVars: {
                                            rel: 0,
                                        }
                                    }}
                                    className={"w-full h-fit"}
                                    videoId={id}
                              />
                          </div>
                    ) : (
                          <div className={cn(className, "border rounded")}/>
                    )
              ) : (
                    <div className={cn(className, "border rounded gap-2 flex flex-col place-content-center place-items-center")}>
                        <h2 className={"text-center"}>No video provided</h2>
                        <Button onClick={async () => {
                            const event = await GetEvent(match.eventKey);
                            window.open(`https://www.youtube.com/results?search_query=${match.compLevel.toUpperCase()}${match.matchNumber} ${event?.year} ${event?.name}`, "_blank")
                        }}>Search on Youtube</Button>
                    </div>
              )}
          </>
    );
}
