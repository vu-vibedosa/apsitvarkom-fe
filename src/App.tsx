import React, { useEffect, useState } from "react";
import Example from "./components/Example";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";
import type { PollutedLocationType } from "./components/pollutedLocationCard/PollutedLocationCard";
import { getAllPollutedLocations } from "./backEndClient";

const App: React.FC = () => {
  const [pollutedLocations, SetPollutedLocations] = useState<
    PollutedLocationType[]
  >([]);

  useEffect(() => {
    getAllPollutedLocations()
      .then((response) =>
        SetPollutedLocations(
          response.data.map(
            (loc) => ({ ...loc, title: "Temp" } as PollutedLocationType)
          )
        )
      )
      .catch((e) => {
        console.error(e);
        SetPollutedLocations([]);
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
