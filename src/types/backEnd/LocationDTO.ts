/**
 * Data Transfer Object for @type {Location}.
 */
export type LocationDTO = Partial<{
  /**
   * Property equivalent to @see {Location.longitude}.
   */
  longitude: number;
  /**
   * Property equivalent to @see {Location.latitude}.
   */
  latitude: number;
}>;
