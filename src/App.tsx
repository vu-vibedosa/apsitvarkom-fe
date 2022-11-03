import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationDTO";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";

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

  switch (pollutedLocations.status) {
    case "success": {
      return (
        <Layout>
          <div className="space-y-4 max-w-xl">
            {pollutedLocations.data.map((location) => (
              <PollutedLocationCard {...location} key={location.id} />
            ))}
          </div>
        </Layout>
      );
    }
    case "loading": {
      return (
        <Layout>
          <div className="space-y-4 max-w-xl">
            <p>Loading</p>
          </div>
        </Layout>
      );
    }
    case "error": {
      return (
        <Layout>
          <div className="space-y-4 max-w-xl">
            <p>Error</p>
          </div>
        </Layout>
      );
    }
  }
};

export default App;
