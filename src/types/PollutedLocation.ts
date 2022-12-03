import { DefaultTFuncReturn, TFunction } from "i18next";
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

type PollutedLocation = Partial<{
  id: string;
  location: Partial<{
    title: Partial<{
      en: string;
      lt: string;
    }>;
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
  events: CleaningEvent[];
}>;

export default PollutedLocation;
