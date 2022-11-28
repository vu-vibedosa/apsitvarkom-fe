import CleaningEvent from "../CleaningEvent";

type CleaningEventResponse = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: string;
  notes: string;
}>;

export default CleaningEventResponse;

export const mapToCleaningEvent: (
  from: CleaningEventResponse
) => CleaningEvent = (from) => {
  const dateObject = from.startTime ? new Date(from.startTime) : undefined;

  return {
    ...from,
    startTime:
      dateObject && !isNaN(dateObject.getTime()) ? dateObject : undefined,
  };
};
