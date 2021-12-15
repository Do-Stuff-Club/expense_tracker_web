// ===================================================================
//                              Imports
// ===================================================================
import startOfMonth from 'date-fns/startOfMonth';
import startOfYear from 'date-fns/startOfYear';
import subDays from 'date-fns/subDays';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';

// ===================================================================
//                               Types
// ===================================================================
export type DateRangeType =
    | 'TODAY'
    | 'YTD'
    | 'MTD'
    | 'PREV_N_DAYS'
    | 'PREV_N_MONTHS'
    | 'PREV_N_YEARS'
    | 'CUSTOM_RANGE';

/**
 * Date ranges that must be computed from current day and require no
 * information aside from the type. Includes the following:
 * - YTD: Year To Date, January 1st of the current year to the current date
 * - MTD: Month To Date, first day of the current month to the current date
 * - TODAY: only the current date
 */
type ComputedBasicDateRange = {
    type: 'TODAY' | 'YTD' | 'MTD';
};

/**
 * Date ranges that must be computed from current day and have a specified
 * quantity for amount of time to go back (1 day, 2 months, 3 years, etc.)
 * Includes the following:
 * - PREV_N_DAYS: Previous N days, where N is specified by the `quantity` field
 * - PREV_N_MONTHS: Previous N months, where N is specified by the `quantity` field
 * - PREV_N_YEARS: Previous N years, where N is specified by the `quantity` field
 */
type ComputedPrevDateRange = {
    type: 'PREV_N_DAYS' | 'PREV_N_MONTHS' | 'PREV_N_YEARS';
    quantity: number;
};

/**
 * Date ranges that are fully-specified by a start and end date.
 */
type SpecifiedDateRange = {
    type: 'CUSTOM_RANGE';
    start: Date;
    end: Date;
};

/**
 * Union type for all of our date ranges
 */
export type DateRange =
    | ComputedBasicDateRange
    | ComputedPrevDateRange
    | SpecifiedDateRange;

// ===================================================================
//                              Classes
// ===================================================================
/**
 * Custom class for DateRangeErrors
 */
class DateRangeError extends Error {
    constructor(msg: string) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DateRangeError.prototype);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DateRangeError);
        }

        this.name = 'DateRangeError';
    }
}
// ===================================================================
//                             Functions
// ===================================================================
/**
 * Function that returns the current date, with time normalized to 0.
 *
 * @returns {Date} - Date object representing current day with normalized time
 */
export const todaysDate = (): Date => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};

/**
 * Converts our custom DateRange objects to a start and end date
 *
 * @param {DateRange} range - The custom date range object to convert
 * @returns {{ start: Date; end: Date }} An object with specific start and end dates.
 */
export const dateRangeStartEnd = (
    range: DateRange,
): { start: Date; end: Date } => {
    switch (range.type) {
        case 'TODAY': {
            const today = todaysDate();
            return { start: today, end: today };
            break;
        }
        case 'MTD': {
            const today = todaysDate();
            return { start: startOfMonth(today), end: today };
            break;
        }
        case 'YTD': {
            const today = todaysDate();
            return { start: startOfYear(today), end: today };
            break;
        }
        case 'PREV_N_DAYS': {
            const today = todaysDate();
            return { start: subDays(today, range.quantity), end: today };
            break;
        }
        case 'PREV_N_MONTHS': {
            const today = todaysDate();
            return { start: subMonths(today, range.quantity), end: today };
            break;
        }
        case 'PREV_N_YEARS': {
            const today = todaysDate();
            return { start: subYears(today, range.quantity), end: today };
            break;
        }
        case 'CUSTOM_RANGE': {
            return { start: range.start, end: range.end };
            break;
        }
    }
};

export const toDateRange = (
    type: DateRangeType,
    start?: Date,
    end?: Date,
    quantity?: number,
): DateRange => {
    if (type == 'CUSTOM_RANGE') {
        if (start == undefined || end == undefined)
            throw new DateRangeError(
                `Tried to create CUSTOM_RANGE date range, but start or end range is not defined. start: ${start}, end:${end}`,
            );
        return {
            type,
            start,
            end,
        };
    } else if (
        type == 'PREV_N_DAYS' ||
        type == 'PREV_N_MONTHS' ||
        type == 'PREV_N_YEARS'
    ) {
        if (quantity == undefined)
            throw new DateRangeError(
                `Tried to create ${type} date range, but quantity not defined.`,
            );
        return {
            type,
            quantity,
        };
    } else {
        return {
            type,
        };
    }
};
