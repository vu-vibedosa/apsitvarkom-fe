import { LocationDTO } from "./LocationDTO";

/**
 * Data Transfer Object for @type {PollutedLocation}.
 */
export type PollutedLocationDTO = {
  /**
   * Property equivalent to @see {PollutedLocation.id}
   */
  id: string;
  /**
   * Property equivalent to @see {PollutedLocation.location}
   */
  location: LocationDTO;
  /**
   * Property equivalent to @see {PollutedLocation.radius}
   */
  radius: number;
  /**
   * Property equivalent to @see {PollutedLocation.severity}
   */
  severity: string;
  /**
   * Property equivalent to @see {PollutedLocation.spotted}
   */
  spotted: string;
  /**
   * Property equivalent to @see {PollutedLocation.progress}
   */
  progress: number;
  /**
   * Property equivalent to @see {PollutedLocation.notes}
   */
  notes: string;
};
