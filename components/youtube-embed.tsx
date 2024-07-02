'use client'

import YouTube from "react-youtube";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export default function YoutubeEmbed({id, className}: { id?: string, className?: string }) {
    return (
          <>
              {id ? (
                    <div className={cn(className, "w-fit h-fit rounded-lg overflow-hidden z-1")}>
                        <YouTube opts={
                            {
                                width: '640',
                                height: '390',
                                playerVars: {
                                    rel: 0,
                                }
                            }
                        } videoId={id}/>
                    </div>
              ) : (
                    <div className={"w-[640px] h-[390px] border rounded-lg gap-2 flex flex-col place-content-center place-items-center"}>
                        <h2>No video provided</h2>
                        <a><Button>Search on Youtube</Button></a>
                    </div>
              )}
          </>
    );
}