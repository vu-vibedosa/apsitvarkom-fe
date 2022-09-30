import React from "react";
import Example from "./components/Example";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";
import PollutedLocationDTO from "./types/backEnd/PollutedLocationDTO";

type PollutedLocation = PollutedLocationDTO & {
  title?: string;
};

const App: React.FC = () => {
  const pollutedLocation: PollutedLocation = {
    id: "a950ab10-d394-468b-b2ef-776135a65b96",
    title: "Unknown Title",
    location: {
      longitude: 121.151,
      latitude: 121.151,
    },
    radius: 20,
    severity: "low",
    spotted: "2022-09-22T09:00:29.4542617Z",
    progress: 66,
    notes: "something should be written there :)",
  };
  return (
    <Layout>
      <Example />
      <PollutedLocationCard {...pollutedLocation} />
    </Layout>
  );
};

export default App;
