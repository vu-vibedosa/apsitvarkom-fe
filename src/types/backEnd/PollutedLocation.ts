/**
 * Type for storing captured polluted location records.
 */
export type PollutedLocation = {
  /**
   * Unique identifier of the given record.
   */
  id: string;
  /**
   * Geolocation of the given record.
   */
  location: CustomLocation;
  /**
   * Rough size estimate of the given record area in meters from the center.
   */
  radius: number;
  /**
   * Estimated current pollution level of the record.
   */
  severity: LocationSeverityLevel;
  /**
   * Date of when the record was created.
   */
  spotted: Date;
  /**
   * Current progress of the record's cleaning process in percentages.
   */
  progress: number;
  /**
   * Additional information about the record.
   */
  notes: string;
};

/**
 * Type for storing locations.
 */
type CustomLocation = {
  /**
   * Latitude of the location. Cannot be less than -90.0 degrees or exceed 90.0 degrees.
   */
  latitude: number;
  /**
   * Longitude of the location. Cannot be less than -180 degrees or exceed 180 degrees.
   */
  longitude: number;
};

/**
 * Enumeration type for pollution levels of the location.
 */
enum LocationSeverityLevel {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
}
