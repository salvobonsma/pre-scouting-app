import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import dayjs from "dayjs";

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
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c2 = 0.3989423;

    if (z > 6.0) {
        return 1.0;
    } // this guards against overflow
    if (z < -6.0) {
        return 0.0;
    }

    const a = Math.abs(z);
    const t = 1.0 / (1.0 + a * p);
    const b = c2 * Math.exp((-z) * (z / 2.0));
    let n = ((((b5 * t + b4) * t) + b3) * t + b2) * t + b1;
    n = 1.0 - b * n;

    if (z < 0.0) {
        return 1.0 - n;
    }
    return n;
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
