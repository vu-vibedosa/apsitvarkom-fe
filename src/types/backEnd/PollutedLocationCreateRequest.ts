import { severityLevels } from "../PollutedLocation";

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

export default PollutedLocationCreateRequest;
