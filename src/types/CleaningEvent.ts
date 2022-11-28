type CleaningEvent = Partial<{
  id: string;
  pollutedLocationId: string;
  startTime: Date;
  notes: string;
}>;

export default CleaningEvent;
