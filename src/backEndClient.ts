import axios from "axios";
import PollutedLocationGetRequest from "./types/backEnd/PollutedLocationGetResponse";

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationGetRequest[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};
