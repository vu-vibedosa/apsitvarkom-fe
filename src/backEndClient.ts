import axios from "axios";
import PollutedLocationResponse from "./types/backEnd/PollutedLocationResponse";
import TidyingEventResponse from "./types/backEnd/TidyingEventResponse";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};

export const getAllTidyingEvents = () => {
  return axios.get<TidyingEventResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/TidyingEvent/All"
  );
};
