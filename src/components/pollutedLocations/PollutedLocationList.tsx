import React from "react";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";
import PollutedLocationCard, {
  PollutedLocationCardLoading,
} from "./PollutedLocationCard";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
  googleMap: google.maps.Map | null;
}

const PollutedLocationList: React.FC<Props> = ({
  locationsRequest,
  googleMap,
}) => {
  const content = () => {
    switch (locationsRequest.status) {
      case "success":
        return (
          <div className="space-y-4 h-5/6 overflow-y-auto">
            {locationsRequest.data.map((location) => (
              <PollutedLocationCard
                pollutedLocation={location}
                googleMap={googleMap}
                key={location.id}
              />
            ))}
          </div>
        );
      case "loading":
        return (
          <div className="space-y-4 h-5/6 overflow-auto">
            {[...Array(10)].map((_, index) => (
              <PollutedLocationCardLoading key={index} />
            ))}
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex justify-center items-center h-5/6">
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
    <div className="p-2 w-full h-full md:w-96 md:flex-none overflow-y-auto">
      {content()}
      <hr />
      <div className="flex justify-center items-center p-2 w-full h-1/6">
        <div className="p-2 flex w-full justify-center items-center">
          <Link to={"/form"} className="p-1 w-full align-items-bottom">
            <button className="align bottom p-1 w-full bg-green-200 hover:bg-green-300 text-black font-semibold py-2 px-4 border rounded">
              Create a Form
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PollutedLocationList;
