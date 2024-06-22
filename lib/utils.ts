import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import dayjs from "dayjs";
import * as ss from 'simple-statistics';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function truncate(string: string, length: number) {
    return (string.length > length) ? string.slice(0, length - 1) + '...' : string;
}

export function isPast(date: Date | string) {
    const newDate = typeof date == "string" ? new Date(date) : date;
    return dayjs(newDate).isAfter(dayjs())
}

export function sd(set: number[]) {
    const mean = set.reduce((a, b) => a + b) / set.length;
    return Math.sqrt(set.reduce((a, b) => a + Math.pow(b - mean, 2)) / set.length);
}

export function zScore(set: number[], sample: number) {
    return (sample - set.reduce((a, b) => a + b) / set.length) / sd(set);
}

export function percentile(z: number): number {
    return ss.probit(z);
}

export function withOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;

    if (j == 1 && k != 11) {
        return num + "st";
    }
    if (j == 2 && k != 12) {
        return num + "nd";
    }
    if (j == 3 && k != 13) {
        return num + "rd";
    }
    return num.toFixed() + "th";
}

export function reload() {
    window.location.reload();
}
