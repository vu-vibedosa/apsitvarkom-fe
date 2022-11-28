import CleaningEvent from "./CleaningEvent";

export const severityLevels = ["low", "moderate", "high"] as const;

type PollutedLocation = Partial<{
  id: string;
  location: Partial<{
    title: string;
    coordinates: Partial<{
      longitude: number;
      latitude: number;
    }>;
  }>;
  radius: number;
  severity: typeof severityLevels[number]; // One of severityLevels values
  spotted: Date;
  progress: number;
  notes: string;
  events: CleaningEvent[];
}>;

export default PollutedLocation;
