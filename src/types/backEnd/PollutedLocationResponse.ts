import PollutedLocation, { severityLevels } from "../PollutedLocation";

type PollutedLocationResponse = Partial<{
  id: string;
  location: Partial<{
    title: string;
    coordinates: Partial<{
      longitude: number;
      latitude: number;
    }>;
  }>;
  radius: number;
  severity: string;
  spotted: string;
  progress: number;
  notes: string;
}>;

export default PollutedLocationResponse;

export const mapToPollutedLocation: (
  from: PollutedLocationResponse
) => PollutedLocation = (from) => {
  const dateObject = from.spotted ? new Date(from.spotted) : undefined;

  return {
    ...from,
    spotted:
      dateObject && !isNaN(dateObject.getTime()) ? dateObject : undefined,
    severity: severityLevels.find(
      (level) =>
        from.severity &&
        // Case insensitive compare of strings
        level.localeCompare(from.severity, undefined, {
          sensitivity: "accent",
        }) === 0
    ),
  };
};
