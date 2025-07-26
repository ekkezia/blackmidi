import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function map(value: number, minValue: number, maxValue: number, minMapTo: number, maxMapTo: number) {
  return Math.floor((value - minValue) * (maxMapTo - minMapTo) / (maxValue - minValue) + minMapTo);
}