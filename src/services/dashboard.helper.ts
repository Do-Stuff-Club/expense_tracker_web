// ===================================================================
//                             Imports
// ===================================================================
import { Expense } from '../redux/expenses/types';
import { Tag, TagState } from '../redux/tags/types';
import { alea } from 'seedrandom';
import { getTagAncestry } from '../redux/tags/state';

// ===================================================================
//                               Types
// ===================================================================
export type SingleTagExpenses = {
    tag: Tag;
    expenses: readonly Expense[];
};
export type MixedTagExpenses = {
    tags: readonly Tag[];
    expenses: readonly Expense[];
};
export type UndefinedTagExpenses = {
    expenses: readonly Expense[];
};

export type SortedTagExpenses =
    | SingleTagExpenses
    | MixedTagExpenses
    | UndefinedTagExpenses;

// ===================================================================
//                             Functions
// ===================================================================

export const intersection = <T>(
    a: readonly T[],
    b: readonly T[],
): readonly T[] => a.filter((item) => b.includes(item));

export const getUnique = <T>(a: readonly T[]): readonly T[] =>
    a.filter((item, idx) => a.indexOf(item) === idx);

/**
 * Helper function for getUniqueAncestors
 * @param expense
 * @param tagState
 * @returns
 */
const getUniqueAncestors = (
    // FIXME should relaly use Sets instead of arrays
    expense: Expense,
    tagState: TagState,
): readonly Tag[] => {
    const ancestors = expense.tags.map((t) => getTagAncestry(tagState, t.id));
    const ancestorList = ancestors.reduce((acc, list) => [...acc, ...list], []);
    return getUnique(ancestorList);
};

export const getTagCombinations = (
    tags: readonly Tag[],
    expenses: readonly Expense[],
    tagState: TagState,
): [
    readonly SingleTagExpenses[],
    readonly MixedTagExpenses[],
    UndefinedTagExpenses,
] => {
    // Initialize data structures

    // Expenses matching only a single tag in the list
    const singleTag: Record<number, SingleTagExpenses> = {};
    tags.forEach((tag) => {
        singleTag[tag.id] = {
            tag,
            expenses: [],
        };
    });

    // Expenses matching several tags in the list
    const multiTag: Record<string, MixedTagExpenses> = {};

    // Helper function for computing multiTag hashes
    const multiTagHash = (tags: readonly Tag[]): string => {
        const ids = tags.map((tag) => tag.id);
        return ids.sort().join();
    };

    // Expenses matching none of the tags in the list
    let unsorted: UndefinedTagExpenses = {
        expenses: [],
    };

    expenses.forEach((expense) => {
        const matches = intersection(
            getUniqueAncestors(expense, tagState),
            tags,
        );

        if (matches.length == 0) {
            // No tag matches
            unsorted = {
                expenses: [...unsorted.expenses, expense],
            };
        } else if (matches.length == 1) {
            // One tag match
            const tag = matches[0];

            singleTag[tag.id] = {
                tag,
                expenses: [...singleTag[tag.id].expenses, expense],
            };
        } else {
            // Multi tag match
            const hash = multiTagHash(matches);

            if (multiTag[hash] == undefined) {
                // Initialize new multi tag bin
                multiTag[hash] = {
                    tags: matches,
                    expenses: [expense],
                };
            } else {
                // Add to existing multi tag bin
                multiTag[hash] = {
                    ...multiTag[hash],
                    expenses: [...multiTag[hash].expenses, expense],
                };
            }
        }
    });

    // Collect all bins together
    return [Object.values(singleTag), Object.values(multiTag), unsorted];
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * Credit to https://gist.github.com/mjackson/5311256
 *
 * @param {number} h - The hue
 * @param {number} s - The saturation
 * @param {number} l - The lightness
 * @returns {Array<number>} The RGB representation
 */
export function hslToRgb(
    h: number,
    s: number,
    l: number,
): [number, number, number] {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

/**
 * Helper function that generates a random color for a TagChip.
 * Must be deterministic based on the string.
 * Based off this excellent blog post:
 * https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 *
 * @param {string} label - input string to hash
 * @returns {string} CSS color string in RGB format
 */
export function randomColorFromLabel(label: string): string {
    const generator = alea(label);
    const hash = generator();
    const goldenRatioConjugate = 0.618033988749895;

    const hue = (hash + goldenRatioConjugate) % 1; // degrees
    const saturation = 0.8; // percent saturation
    const lightness = 0.8; // percent lightness

    const [r, g, b] = hslToRgb(hue, saturation, lightness);

    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
