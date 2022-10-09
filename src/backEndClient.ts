import axios from "axios";
import { ExampleModel } from "./components/Example";
import PollutedLocationDTO from "./types/backEnd/PollutedLocationDTO";

export const getExample = () => {
  return axios.get<ExampleModel>(
    process.env.REACT_APP_BACK_END_URL + "/api/Example"
  );
};

export const getAllPollutedLocations = () => {
  return axios.get<PollutedLocationDTO[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All"
  );
};
