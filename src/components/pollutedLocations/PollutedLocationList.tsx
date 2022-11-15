import React from "react";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard from "./PollutedLocationCard";

interface Props {
  locations: PollutedLocation[];
}

const PollutedLocationList: React.FC<Props> = ({ locations }) => {
  return (
    <div className="space-y-4 overflow-y-auto p-3 w-full md:w-96 flex-1 md:flex-none">
      {locations.map((location) => (
        <PollutedLocationCard {...location} key={location.id} />
      ))}
    </div>
  );
};

export default PollutedLocationList;
