import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard from "./PollutedLocationCard";

const PollutedCardList = (list: PollutedLocation[]) => {
  return (
    <div className="space-y-4 max-w-xl overflow-y-auto">
      <div className="sm:max-md:w-96 lg:max-2xl:w-full">
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
