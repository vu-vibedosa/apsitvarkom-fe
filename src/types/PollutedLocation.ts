const severityLevels = ["low", "moderate", "high"] as const;

export type PollutedLocation = Partial<{
  id: string;
  location: Partial<{
    longitude: number;
    latitude: number;
  }>;
  radius: number;
  severity: typeof severityLevels[number]; // One of severityLevels values
  spotted: Date;
  progress: number;
  notes: string;
}>;
