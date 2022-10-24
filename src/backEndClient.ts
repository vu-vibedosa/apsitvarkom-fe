import axios from "axios";
import PollutedLocationDTO from "./types/backEnd/PollutedLocationDTO";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationDTO[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};
