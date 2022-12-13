import Validated from "../Validated";

export type CleaningEventCreateFormData = {
  pollutedLocationId: string;
  startTime: Validated<Date | undefined>;
  notes?: string;
};

export type CleaningEventCreateRequest = {
  pollutedLocationId: string;
  startTime: Date;
  notes?: string;
};

export const toCleaningEventCreateRequest: (
  form: CleaningEventCreateFormData
) => CleaningEventCreateRequest = (form) => {
  return {
    ...form,
    startTime: form.startTime.value || new Date(),
  };
};
