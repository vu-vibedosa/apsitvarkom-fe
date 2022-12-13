export const cleaningEventStatuses = [
  "foreseen",
  "finished",
  "finalized",
] as const;

type CleaningEvent = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: Date;
  notes: string;
  status: typeof cleaningEventStatuses[number];
}>;

export default CleaningEvent;
