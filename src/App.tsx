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

  return (
    <Layout>
      <div className="space-y-4 max-w-xl">
        {processStatus(pollutedLocations)}
      </div>
    </Layout>
  );
};

const processStatus = (response: ApiRequest<PollutedLocation[]>) => {
  switch (response.status) {
    case "success": {
      return response.data.map((location) => (
        <PollutedLocationCard {...location} key={location.id} />
      ));
    }
    case "loading": {
      return <p>Loading</p>;
    }
    case "error": {
      return <p>Error</p>;
    }
  }
};

export default App;
