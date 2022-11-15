import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import PollutedLocationList from "./components/pollutedLocations/PollutedLocationList";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationDTO";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map from "./components/map/Map";

const App: React.FC = () => {
  const [pollutedLocations, setPollutedLocations] = useState<
    ApiRequest<PollutedLocation[]>
  >({ status: "loading" });

  useEffect(() => {
    getAllPollutedLocations()
      .then((response) =>
        setPollutedLocations({
          status: "success",
          data: response.data.map((locationDTO) =>
            mapToPollutedLocation(locationDTO)
          ),
        })
      )
      .catch((e) => {
        console.error(e);
        setPollutedLocations({ status: "error" });
      });
  }, []);

  return (
    <Layout>
      <Map locationsRequest={pollutedLocations} />
      <PollutedLocationList locationsRequest={pollutedLocations} />
    </Layout>
  );
};

export default App;
