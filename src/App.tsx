import React from "react";
import Example from "./components/Example";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";

type PollutedLocationType = Partial<{
  id?: string;
  title?: string;
  location: Partial<{
    longitude?: number;
    latitude?: number;
  }>;
  radius?: number;
  severity?: string;
  spotted?: string;
  progress?: number;
  notes?: string;
}>;

const App: React.FC = () => {
  const pollutedLocation: PollutedLocationType = {
    id: "uid-420-...",
    title: "Unknow Title",
    location: {
      longitude: 15,
      latitude: 18,
    },
    radius: 20,
    severity: "low",
    spotted: "2022-08-05",
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
