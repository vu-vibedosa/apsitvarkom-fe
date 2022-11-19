import axios from "axios";
import PollutedLocationResponse from "./types/backEnd/PollutedLocationResponse";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};
