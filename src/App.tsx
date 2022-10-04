import React from "react";
import Example from "./components/Example";
import Layout from "./components/layout/Layout";
import PollutedLocationCard from "./components/pollutedLocationCard/PollutedLocationCard";
import type { PollutedLocationType } from "./components/pollutedLocationCard/PollutedLocationCard";

const App: React.FC = () => {
  const fakePollutedLocations: PollutedLocationType[] = [
    {
      id: "a950ab10-d394-468b-b2ef-776135a65b96",
      title: "Title #1",
      location: {
        longitude: 121.151,
        latitude: 121.151,
      },
      radius: 20,
      severity: "low",
      spotted: new Date("2022-09-22T09:00:29.4542617Z"),
      progress: 66,
      notes: "something should be written there :)",
    },
    {
      id: "b950ab10-d394-468b-b2ef-776135a65b98",
      location: {
        longitude: 102.158,
        latitude: 103.123,
      },
      radius: 7,
      severity: "high",
      spotted: new Date("2022-07-15T09:00:29.4542617Z"),
      progress: 0,
      notes: "Lorem ipsum",
    },
    {
      id: "c950ab10-d394-468b-b2ef-776135a65b97",
      title: "Title #2",
      location: {
        longitude: 112.327,
        latitude: 97.842,
      },
      radius: 38,
      severity: "moderate",
      spotted: new Date("2022-08-22T09:00:29.4542617Z"),
      progress: 100,
      notes: "Hello world",
    },
  ];

  return (
    <Layout>
      <Example />
      <div className="space-y-4 max-w-xl">
        {fakePollutedLocations.map((pl) => (
          <PollutedLocationCard {...pl} key={pl.id} />
        ))}
      </div>
    </Layout>
  );
};

export default App;
