import { severityLevels } from "../PollutedLocation";
import Validated from "../Validated";

export type PollutedLocationCreateForm = {
  location: {
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
  radius: Validated<number>;
  severity: typeof severityLevels[number];
  notes?: string;
};

type PollutedLocationCreateRequest = {
  location: {
    coordinates: {
      longitude: number;
      latitude: number;
    };
  };
  radius: number;
  severity: typeof severityLevels[number];
  notes?: string;
};

export const toPollutedLocationCreateRequest: (
  form: PollutedLocationCreateForm
) => PollutedLocationCreateRequest = (form) => {
  return {
    ...form,
    radius: form.radius.value,
  };
};

export default PollutedLocationCreateRequest;
