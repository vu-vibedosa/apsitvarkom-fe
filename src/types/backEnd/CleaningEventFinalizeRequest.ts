import Validated from "../Validated";

export type CleaningEventFinalizeFormData = {
  id: string;
  newProgress: Validated<number | undefined>;
};

export type CleaningEventFinalizeRequest = {
  id: string;
  newProgress: number;
};

export const toCleaningEventFinalizeRequest: (
  form: CleaningEventFinalizeFormData
) => CleaningEventFinalizeRequest = (form) => {
  return {
    ...form,
    newProgress: form.newProgress.value || 0,
  };
};
