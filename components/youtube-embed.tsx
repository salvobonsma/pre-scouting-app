'use client'

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Match} from "@/app/[eventId]/[teamNumber]/matches/matches";
import {GetEvent} from "@/lib/database/get-event";

export default function YoutubeEmbed({id, match, className}: {
    id: string | null,
    match: Match,
    className?: string
}) {
    return (
          <>
              {id ? (
                    <div className={cn(className, "rounded-lg overflow-hidden")}>
                        <iframe
                              className={"w-full h-full"}
                              src={`https://www.youtube.com/embed/${id}?rel=0&`}
                              allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
                              allowFullScreen
                              title={"Match Video"}
                        />
                    </div>
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
