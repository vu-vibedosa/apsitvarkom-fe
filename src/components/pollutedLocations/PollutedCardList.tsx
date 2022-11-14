import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard from "./PollutedLocationCard";

const PollutedCardList = (list: PollutedLocation[]) => {
  return (
    <div className="space-y-4 max-w-xl overflow-y-auto">
      <div className="w-96 md:w-full">
        {list.map((location) => (
          <>
            <PollutedLocationCard {...location} key={location.id} />
          </>
        ))}
      </div>
    </div>
  );
};

export default PollutedCardList;
