import PollutedLocationGetRequest from "./backEnd/PollutedLocationGetResponse";

export const severityLevels = ["low", "moderate", "high"] as const;

type PollutedLocation = Partial<{
  id: string;
  location: Partial<{
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
}>;

export default PollutedLocation;

export const mapToPollutedLocationGetRequest: (
  from: PollutedLocation
) => PollutedLocationGetRequest = (from) => ({
  ...from,
  spotted: from.spotted?.toISOString(),
});
