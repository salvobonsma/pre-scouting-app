'use server'

import {tba} from "@/lib/tba/tba";

export async function GetEvent(key: string) {
    return (await tba.GET("/event/{event_key}", {params: {path: {event_key: key}}})).data;
}