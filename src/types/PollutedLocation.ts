import { DefaultTFuncReturn, TFunction } from "i18next";
import supportedLanguages from "../languages";
import CleaningEvent from "./CleaningEvent";

export const severityLevels = ["low", "moderate", "high"] as const;

export const severityLevelsLocalized = (t: TFunction) => {
  const translations: Record<
    typeof severityLevels[number],
    DefaultTFuncReturn
  > = {
    low: t("severityLow", "Low"),
    moderate: t("severityModerate", "Moderate"),
    high: t("severityHigh", "High"),
  };

  return translations;
};

export type Coordinates = Partial<{
  longitude: number;
  latitude: number;
}>;

type PollutedLocation = Partial<{
  id: string;
  location: Partial<{
    title: Record<typeof supportedLanguages[number], string>;
    coordinates: Coordinates;
  }>;
  radius: number;
  severity: typeof severityLevels[number]; // One of severityLevels values
  spotted: Date;
  progress: number;
  notes: string;
  events: CleaningEvent[];
}>;

export default PollutedLocation;
