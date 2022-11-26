import TidyingEvent from "../TidyingEvent";

type TidyingEventResponse = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: string;
  notes: string;
}>;

export default TidyingEventResponse;

export const mapToTidyingEvent: (from: TidyingEventResponse) => TidyingEvent = (
  from
) => {
  const dateObject = from.startTime ? new Date(from.startTime) : undefined;

  return {
    ...from,
    startTime:
      dateObject && !isNaN(dateObject.getTime()) ? dateObject : undefined,
  };
};
