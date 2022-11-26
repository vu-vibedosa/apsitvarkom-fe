type TidyingEvent = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: Date;
  notes: string;
}>;

export default TidyingEvent;
