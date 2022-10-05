import axios from "axios";
import { ExampleModel } from "./components/Example";
import PollutedLocationDTO from "./types/backEnd/PollutedLocationDTO";

export const getExample = () => {
  return axios.get<ExampleModel>("/api/Example");
};

export const getAllPollutedLocations = () => {
  return axios.get<Array<PollutedLocationDTO>>("/api/PollutedLocation/All");
};
