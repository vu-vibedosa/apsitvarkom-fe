import axios, { AxiosRequestConfig } from "axios";
import PollutedLocationCreateRequest from "./types/backEnd/PollutedLocationCreateRequest";
import PollutedLocationResponse from "./types/backEnd/PollutedLocationResponse";
import CleaningEventResponse from "./types/backEnd/CleaningEventResponse";
import { Coordinates } from "./types/PollutedLocation";
import PollutedLocationUpdateRequest from "./types/backEnd/PollutedLocationUpdateRequest";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAllPollutedLocations = (config?: AxiosRequestConfig) => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/All",
    config
  );
};

export const getPollutedLocation = (id: string) => {
  return axios.get<PollutedLocationResponse>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation?Id=" + id
  );
};

export const getAllPollutedLocationsOrdered = (coordinates: Coordinates) => {
  return axios.get<PollutedLocationResponse[]>(
    process.env.REACT_APP_BACK_END_URL +
      "/api/PollutedLocation/All/OrderedByDistance" +
      `?Latitude=${coordinates.latitude}&Longitude=${coordinates.longitude}`
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

export const updatePollutedLocation = (
  request: PollutedLocationUpdateRequest
) => {
  return axios.patch<PollutedLocationResponse>(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/Update",
    JSON.stringify(request)
  );
};

export const deletePollutedLocation = (id: string) => {
  return axios.delete(
    process.env.REACT_APP_BACK_END_URL + "/api/PollutedLocation/Delete?Id=" + id
  );
};

export const getAllCleaningEvents = () => {
  return axios.get<CleaningEventResponse[]>(
    process.env.REACT_APP_BACK_END_URL + "/api/CleaningEvent/All"
  );
};
