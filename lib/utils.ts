import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function truncate(string: string, length: number) {
    return (string.length > length) ? string.slice(0, length - 1) + '...' : string;
}
