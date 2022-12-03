import axios from "axios";
import PollutedLocationCreateRequest from "./types/backEnd/PollutedLocationCreateRequest";
import PollutedLocationResponse from "./types/backEnd/PollutedLocationResponse";
import CleaningEventResponse from "./types/backEnd/CleaningEventResponse";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};

export const getAllPollutedLocationsOrdered = () => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};

export const createPollutedLocation = (
  request: PollutedLocationCreateRequest
) => {
  return axios.post<PollutedLocationResponse>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/Create",
    JSON.stringify(request)
  );
};

export const getAllCleaningEvents = () => {
  return axios.get<CleaningEventResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/CleaningEvent/All"
  );
};
