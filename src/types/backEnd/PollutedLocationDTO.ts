import PollutedLocation, { severityLevels } from "../PollutedLocation";

/**
 * Data Transfer Object for @type {PollutedLocation}.
 */
type PollutedLocationDTO = Partial<{
  id: string;
  coordinates: Partial<{
    longitude: number;
    latitude: number;
  }>;
  radius: number;
  severity: string;
  spotted: string;
  progress: number;
  notes: string;
}>;

export default PollutedLocationDTO;

export const mapToPollutedLocation: (
  from: PollutedLocationDTO
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
