/**
 * Data Transfer Object for @type {PollutedLocation}.
 */
export type PollutedLocationDTO = Partial<{
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
