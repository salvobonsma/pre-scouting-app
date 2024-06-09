'use server'

import {tba} from "@/lib/tba/tba";
import {truncate} from "@/lib/utils";

export default async function GetEventsByYear(year: number) {
    const response = await tba.GET("/events/{year}", {
        params: {
            path: {year: year}
        }
    });

    if (!response.data) return [];

    return response.data.map((value): ClientEventSelector => {
        return {value: value.key, display: truncate(`${value.name} in + ${value.city}`, 80)}
    });
}

export interface ClientEventSelector {
    value: string,
    display: string
}