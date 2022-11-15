import React from "react";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard, {
  PollutedLocationCardLoading,
} from "./PollutedLocationCard";
import { MdErrorOutline } from "react-icons/md";

interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
}

const PollutedLocationList: React.FC<Props> = ({ locationsRequest }) => {
  const content = () => {
    switch (locationsRequest.status) {
      case "success":
        return (
          <div className="space-y-4 h-full">
            {locationsRequest.data.map((location) => (
              <PollutedLocationCard {...location} key={location.id} />
            ))}
          </div>
        );
      case "loading":
        return (
          <div className="space-y-4 h-full overflow-y-hidden">
            {[...Array(10)].map((_, index) => (
              <PollutedLocationCardLoading key={index} />
            ))}
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>Error</div>
              <div>Failed to load polluted locations</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-3 w-full h-full md:w-96 md:flex-none overflow-y-auto">
      {content()}
    </div>
  );
};

export default PollutedLocationList;
