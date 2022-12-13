import Validated from "../Validated";

export type CleaningEventUpdateFormData = {
  id: string;
  startTime: Validated<Date | undefined>;
  notes?: string;
};

export type CleaningEventUpdateRequest = {
  id: string;
  startTime: Date;
  notes?: string;
};

export const toCleaningEventUpdateRequest: (
  form: CleaningEventUpdateFormData
) => CleaningEventUpdateRequest = (form) => {
  return {
    ...form,
    startTime: form.startTime.value || new Date(),
  };
};
