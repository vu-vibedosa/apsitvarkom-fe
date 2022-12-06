import { severityLevels } from "../PollutedLocation";
import Validated from "../Validated";

export type PollutedLocationUpdateForm = {
  id: string;
  radius: Validated<number | undefined>;
  severity: typeof severityLevels[number];
  notes?: string;
};

type PollutedLocationUpdateRequest = {
  id: string;
  radius: number;
  severity: typeof severityLevels[number];
  notes?: string;
};

export const toPollutedLocationUpdateRequest: (
  form: PollutedLocationUpdateForm
) => PollutedLocationUpdateRequest = (form) => {
  return {
    ...form,
    radius: form.radius.value || 1,
  };
};

export default PollutedLocationUpdateRequest;
