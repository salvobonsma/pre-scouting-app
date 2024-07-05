'use server'

import {tba} from "@/lib/tba/tba";

export default async function GetEventsByYear(year: number) {
    const response = await tba.GET("/events/{year}", {
        params: {
            path: {year: year}
        }
    });

    if (!response.data) return [];

    return response.data.map((value): ClientEventSelector => {
        return {value: value.key, display: value.name}
    });
}

export interface ClientEventSelector {
    value: string,
    display: string
}