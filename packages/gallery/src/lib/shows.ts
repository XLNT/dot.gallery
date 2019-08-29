import { DateTime } from "luxon";

export enum ShowState {
  Past,
  Open,
  Closed,
}

export const getShowState = (opensAt: string, closesAt: string): ShowState => {
  const now = DateTime.local().toUTC();

  if (now < DateTime.fromISO(opensAt)) {
    return ShowState.Closed;
  }

  if (now > DateTime.fromISO(closesAt)) {
    return ShowState.Past;
  }

  return ShowState.Open;
};
