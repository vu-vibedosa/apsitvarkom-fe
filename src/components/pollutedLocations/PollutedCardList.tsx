import React from "react";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard from "./PollutedLocationCard";

interface Props {
  locations: PollutedLocation[];
}

const PollutedCardList: React.FC<Props> = ({ locations }) => {
  return (
    <div className="space-y-4 max-w-xl overflow-y-auto">
      <div className="w-96 md:w-full">
        {locations.map((location) => (
          <PollutedLocationCard {...location} key={location.id} />
        ))}
      </div>
    </div>
  );
};

export default PollutedCardList;
