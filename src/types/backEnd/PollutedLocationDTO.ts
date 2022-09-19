import PollutedLocation, { severityLevels } from "../PollutedLocation";

/**
 * Data Transfer Object for @type {PollutedLocation}.
 */
type PollutedLocationDTO = Partial<{
  id: string;
  location: Partial<{
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
) => PollutedLocation = (from) => ({
  ...from,
  spotted: from.spotted ? new Date(from.spotted) : undefined,
  severity: severityLevels.find(
    (level) =>
      from.severity &&
      // Case insensitive compare of strings
      level.localeCompare(from.severity, undefined, {
        sensitivity: "accent",
      }) === 0
  ),
});
