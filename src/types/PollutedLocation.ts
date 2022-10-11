import PollutedLocationDTO from "./backEnd/PollutedLocationDTO";

export const severityLevels = ["low", "moderate", "high"] as const;

type PollutedLocation = Partial<{
  id: string;
  coordinates: Partial<{
    longitude: number;
    latitude: number;
  }>;
  radius: number;
  severity: typeof severityLevels[number]; // One of severityLevels values
  spotted: Date;
  progress: number;
  notes: string;
}>;

export default PollutedLocation;

export const mapToPollutedLocationDTO: (
  from: PollutedLocation
) => PollutedLocationDTO = (from) => ({
  ...from,
  spotted: from.spotted?.toISOString(),
});
