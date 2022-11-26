import { severityLevels } from "../PollutedLocation";
import Validated from "../Validated";

type PollutedLocationCreateRequest = {
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

export default PollutedLocationCreateRequest;
