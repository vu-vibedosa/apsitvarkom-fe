import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";

interface Props {
  request: ApiRequest<PollutedLocation>;
  resetRequest: () => void;
}

const PollutedLocationFormResult: React.FC<Props> = ({
  request,
  resetRequest,
}) => {
  const content = () => {
    switch (request.status) {
      case "success":
        return (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdCheckCircleOutline />
              </div>
              <div>Location successfully added!</div>
            </div>
          </div>
        );
      case "loading":
        return (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-2xl animate-spin">
                <MdOutlineChangeCircle className="transform -scale-x-100" />
              </div>
              <div>Loading</div>
            </div>
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex flex-col justify-between h-full">
            <div className="grow flex flex-col justify-center items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>Error</div>
              <div>Failed to report a new polluted location</div>
            </div>
            <button
              className="w-full bg-transparent md:hover:bg-red-500 text-red-700 font-medium md:hover:text-white py-2 px-4 border border-red-500 md:hover:border-transparent rounded"
              onClick={() => resetRequest()}
            >
              Retry
            </button>
          </div>
        );
    }
  };

  return content();
};

export default PollutedLocationFormResult;
