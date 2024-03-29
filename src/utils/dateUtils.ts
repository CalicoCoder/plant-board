import {differenceInDays, format, formatDistanceToNowStrict, add} from "date-fns";

/**
 * Creates a date in client's timezone with the proper date from UTC date given by database.
 * This is to avoid the problem of all DB dates being at UTC midnight and showing wrong date when converted to client
 * timezone in many cases.
 * @param date local date object that will be converted to UTC time for DB consistency
 */
function getUtcDate(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/**
 *  Returns the date in human-readable format intended for display.
 *  Options will either be Today/Yesterday/X days ago
 * @param date local date object that will be converted to UTC time for DB consistency
 */
export function getDateDisplayString(date: Date) {
  const utcDate = getUtcDate(date);
  const daysSinceLastWater = differenceInDays(new Date(), utcDate)
  if (daysSinceLastWater == 0) {
    return 'Today!'
  } else if (daysSinceLastWater == 1) {
    return 'Yesterday!'
  } else {
    return formatDistanceToNowStrict(utcDate, {addSuffix: true, roundingMethod: 'floor'});
  }
}

/**
 * Returns the short date only version of the given date.
 * Ex: 12/25/2020 (MM/dd/yyyy)
 * @param date local date object that will be converted to UTC time for DB consistency
 */
export function getShortDate(date: Date) {
  return format(getUtcDate(date), 'MM/dd/yyyy');
}

/**
 * Returns the given date in correct format to use in HTML5 date picker input element.
 * Ex: 2020-12-25 (yyyy-MM-dd)
 * @param date local date object that will be converted to UTC time for DB consistency
 */
export function getDateInHtmlInputFormat(date: Date) {
  return format(getUtcDate(date), 'yyyy-MM-dd');
}

/**
 * Returns the current date in correct format to use in HTML5 date picker input element.
 * Ex: 2020-12-25 (yyyy-MM-dd)
 */
export function getTodayInHtmlInputFormat() {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Converts a value that may be a date or a string but needs to be in string form.
 * This is mainly used to confirm values to proper API expected input
 * @param potentialDate A value that is either a date or string representation of a date. If null or undefined will
 * be returned as an empty string.
 */
export function convertDateToString(potentialDate: Date | string | undefined | null) {
  potentialDate = potentialDate ?? '';
  if (potentialDate instanceof Date) {
    potentialDate = getDateInHtmlInputFormat(potentialDate);
  }
  return potentialDate;
}

/**
 * Adds a set number of days to a given date and returns the resulting new date.
 * @param date Date to add days to
 * @param days How many days to add
 */
export function addDaysToDate(date: Date, days: number){
  return add(date, {days})
}
