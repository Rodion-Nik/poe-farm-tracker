import type { Farm, Drop, ExpensesPreSet } from "../type";

// пресеты расходов для демо
// A — карта: waystone + 2 омена + 2 таблички
const demoPreSetA: ExpensesPreSet["A"] = {
    waystone: {
        map: [{ itemId: "waystone15", customPrice: 0 }],
        omens: [
            { itemId: "omen-of-chaotic-rarity", customPrice: 0 },
            { itemId: "omen-of-chaotic-quantity", customPrice: 0 },
        ],
        tablets: [
            { itemId: "breach-tablet-breach-tablet-normal", customPrice: 0, rowId: 1 },
            { itemId: "ritual-tablet-ritual-tablet-normal", customPrice: 0, rowId: 2 },
        ],
    },
};
// B — Xesht
const demoPreSetB: ExpensesPreSet["B"] = [
    { itemId: "breachlord-sac", customPrice: 0 },
];
// C — Arbiter of Ash
const demoPreSetC: ExpensesPreSet["C"] = [
    { itemId: "ancient-crisis-fragment", customPrice: 0 },
    { itemId: "faded-crisis-fragment", customPrice: 0 },
    { itemId: "weathered-crisis-fragment", customPrice: 0 },
];

export function getDemoFarm(now: number): Farm {
    return {
        id: now,
        name: "Demo farm",
        runs: [
            { id: now + 1, saved: true, time: "00:05:00", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 48 }, { item: "chaos", count: 15 }, { item: "exalted", count: 4 }, { item: "aug", count: 60 }, { item: "chance", count: 9 }] },
            { id: now + 2, saved: true, time: "00:04:40", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "regal", count: 10 }, { item: "adept-rune", count: 3 }, { item: "annul", count: 5 }, { item: "bauble", count: 18 }] },
            { id: now + 3, saved: true, time: "00:05:20", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 2 }, { item: "chaos", count: 22 }, { item: "vaal", count: 7 }, { item: "gcp", count: 3 }] },
            { id: now + 4, saved: true, time: "00:03:15", runSelectedPreSet: "B", PreSet: demoPreSetB, drop: [{ item: "divine", count: 27 }, { item: "exalted", count: 6 }, { item: "annul", count: 2 }] },
            { id: now + 5, saved: true, time: "00:04:55", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 31 }, { item: "aug", count: 44 }, { item: "regal", count: 6 }, { item: "chaos", count: 9 }] },
            { id: now + 6, saved: true, time: "00:05:35", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 5 }, { item: "exalted", count: 5 }, { item: "bauble", count: 12 }, { item: "chance", count: 7 }] },
            { id: now + 7, saved: true, time: "00:04:20", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 2 }, { item: "chaos", count: 18 }, { item: "vaal", count: 4 }, { item: "gcp", count: 5 }, { item: "alch", count: 22 }] },
            { id: now + 8, saved: true, time: "00:03:40", runSelectedPreSet: "B", PreSet: demoPreSetB, drop: [{ item: "divine", count: 24 }, { item: "exalted", count: 9 }, { item: "chaos", count: 14 }] },
            { id: now + 9, saved: true, time: "00:05:10", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "regal", count: 8 }, { item: "aug", count: 51 }, { item: "adept-rune", count: 2 }] },
            { id: now + 10, saved: true, time: "00:04:45", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 39 }, { item: "chaos", count: 11 }, { item: "annul", count: 3 }, { item: "bauble", count: 15 }] },
            { id: now + 11, saved: true, time: "00:06:05", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 2 }, { item: "exalted", count: 3 }, { item: "chance", count: 11 }, { item: "vaal", count: 6 }] },
            { id: now + 12, saved: true, time: "00:07:30", runSelectedPreSet: "C", PreSet: demoPreSetC, drop: [{ item: "divine", count: 22 }, { item: "exalted", count: 12 }, { item: "annul", count: 6 }] },
            { id: now + 13, saved: true, time: "00:04:30", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "chaos", count: 20 }, { item: "aug", count: 38 }, { item: "gcp", count: 4 }] },
            { id: now + 14, saved: true, time: "00:05:15", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 27 }, { item: "regal", count: 9 }, { item: "bauble", count: 21 }, { item: "chance", count: 5 }] },
            { id: now + 15, saved: true, time: "00:04:50", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 5 }, { item: "exalted", count: 7 }, { item: "vaal", count: 5 }, { item: "adept-rune", count: 4 }] },
            { id: now + 16, saved: true, time: "00:03:25", runSelectedPreSet: "B", PreSet: demoPreSetB, drop: [{ item: "divine", count: 30 }, { item: "exalted", count: 5 }, { item: "chaos", count: 19 }] },
            { id: now + 17, saved: true, time: "00:05:40", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 2 }, { item: "chaos", count: 13 }, { item: "alch", count: 35 }, { item: "annul", count: 2 }, { item: "aug", count: 47 }] },
            { id: now + 18, saved: true, time: "00:04:35", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "regal", count: 12 }, { item: "gcp", count: 6 }, { item: "bauble", count: 10 }] },
            { id: now + 19, saved: true, time: "00:05:05", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "exalted", count: 4 }, { item: "chance", count: 8 }, { item: "vaal", count: 3 }] },
            { id: now + 20, saved: true, time: "00:04:25", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 44 }, { item: "chaos", count: 16 }, { item: "adept-rune", count: 1 }] },
            { id: now + 21, saved: true, time: "00:07:10", runSelectedPreSet: "C", PreSet: demoPreSetC, drop: [{ item: "divine", count: 25 }, { item: "exalted", count: 15 }, { item: "gcp", count: 8 }] },
            { id: now + 22, saved: true, time: "00:05:25", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "aug", count: 55 }, { item: "regal", count: 7 }, { item: "annul", count: 4 }, { item: "bauble", count: 14 }] },
            { id: now + 23, saved: true, time: "00:04:15", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 2 }, { item: "chaos", count: 25 }, { item: "exalted", count: 2 }, { item: "chance", count: 6 }] },
            { id: now + 24, saved: true, time: "00:03:50", runSelectedPreSet: "B", PreSet: demoPreSetB, drop: [{ item: "divine", count: 26 }, { item: "exalted", count: 8 }, { item: "annul", count: 3 }] },
            { id: now + 25, saved: true, time: "00:05:00", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 3 }, { item: "alch", count: 29 }, { item: "vaal", count: 8 }, { item: "gcp", count: 2 }, { item: "aug", count: 41 }] },
            { id: now + 26, saved: true, time: "00:04:40", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 4 }, { item: "regal", count: 11 }, { item: "chaos", count: 12 }, { item: "adept-rune", count: 3 }, { item: "bauble", count: 19 }] },
            { id: now + 27, saved: true, time: "00:05:30", runSelectedPreSet: "A", PreSet: demoPreSetA, drop: [{ item: "divine", count: 5 }, { item: "exalted", count: 6 }, { item: "alch", count: 33 }, { item: "chance", count: 10 }] },
        ],
    };
}

export const demoDrop: Drop[] = [
    { item: "alch", count: 7 },
    { item: "regal", count: 1 },
    { item: "chance", count: 4 },
];
