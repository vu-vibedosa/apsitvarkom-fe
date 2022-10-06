import React, { useEffect, useState } from "react";
import Example from "./components/Example";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationDTO";
import PollutedLocation from "./types/PollutedLocation";

const App: React.FC = () => {
  const [pollutedLocations, setPollutedLocations] = useState<
    PollutedLocation[]
  >([]);

  useEffect(() => {
    getAllPollutedLocations()
      .then((response) =>
        setPollutedLocations(
          response.data.map((loc) => mapToPollutedLocation(loc))
        )
      )
      .catch((e) => {
        console.error(e);
        setPollutedLocations([]);
      });
  }, []);

  return (
    <Layout>
      <Example />
      <div className="space-y-4 max-w-xl">
        {pollutedLocations.map((pl) => (
          <PollutedLocationCard {...pl} key={pl.id} />
        ))}
      </div>
    </Layout>
  );
};

export default App;
