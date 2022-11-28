import axios from "axios";
import PollutedLocationResponse from "./types/backEnd/PollutedLocationResponse";
import CleaningEventResponse from "./types/backEnd/CleaningEventResponse";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};

export const getAllCleaningEvents = () => {
  return axios.get<CleaningEventResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/CleaningEvent/All"
  );
};
