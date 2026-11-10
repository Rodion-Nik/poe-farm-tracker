import type { Farm, Drop } from "../type";

export function getDemoFarm(now: number): Farm {
    return{
        id: now,
        name: "Demo farm",
        runs: [
            {
                id: now + 1,
                saved: true,
                time: "00:05:00",
                drop: [
                    { item: "alch", count: 48 },
                    { item: "chaos", count: 15 },
                    { item: "exalted", count: 4 },
                    { item: "aug", count: 60 },
                    { item: "chance", count: 9 },
                ],
            },
            {
                id: now + 2,
                saved: true,
                time: "00:05:00",
                drop: [
                    { item: "divine", count: 2 },
                    { item: "regal", count: 10 },
                    { item: "adept-rune", count: 3 },
                    { item: "annul", count: 5 },
                    { item: "bauble", count: 18 },
                ],
            },
            {
                id: now + 3,
                saved: true,
                time: "00:05:00",
                drop: [
                    { item: "chaos", count: 22 },
                    { item: "vaal", count: 7 },
                    { item: "mirror", count: 1 },
                    { item: "gcp", count: 3 },
                ],
            },
        ],
    };}
    export const demoDrop: Drop[] = [
        { item: "alch", count: 7 },
        { item: "regal", count: 1 },
        { item: "chance", count: 4 },
    ];