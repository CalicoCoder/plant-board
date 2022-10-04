import {differenceInDays, format, formatDistanceToNowStrict} from "date-fns";

function getUtcDate(date: Date) {
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return utcDate;
}

/**
 *  Returns the date in human-readable format intended for display.
 *  Options will either be Today/Yesterday/X days ago
 * @param date local date object that will be converted to UTC time for DB consistency
 */
export function getDateDisplayString(date: Date) {
  const utcDate = getUtcDate(date);
  const daysSinceLastWater = differenceInDays(new Date(), utcDate)
  switch (daysSinceLastWater) {
    case 0:
      return 'Today!'
    case 1:
      return 'Yesterday!'
    default:
      return `${formatDistanceToNowStrict(utcDate, {unit: 'day'})} ago`;
  }
}

export function getShortDate(date: Date){
  return format(getUtcDate(date), 'MM/dd/yyyy');
}
