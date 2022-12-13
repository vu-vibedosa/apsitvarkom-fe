import CleaningEvent, { cleaningEventStatuses } from "../CleaningEvent";

type CleaningEventResponse = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: string;
  notes: string;
  status: typeof cleaningEventStatuses[number];
}>;

export default CleaningEventResponse;

export const mapToCleaningEvent: (
  from: CleaningEventResponse
) => CleaningEvent = (from) => {
  const dateObject = from.startTime ? new Date(from.startTime) : undefined;

  return {
    ...from,
    status: cleaningEventStatuses.find(
      (status) =>
        from.status &&
        // Case insensitive compare of strings
        status.localeCompare(from.status, undefined, {
          sensitivity: "accent",
        }) === 0
    ),
    startTime:
      dateObject && !isNaN(dateObject.getTime()) ? dateObject : undefined,
  };
};
