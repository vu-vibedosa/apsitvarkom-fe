import React from "react";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRadar } from "react-icons/md";
import PollutedLocation, { severityLevels } from "../../types/PollutedLocation";

const PollutedLocationCard: React.FC<PollutedLocation> = ({
  radius,
  progress,
  severity,
}) => {
  const defaultIconSize = 35;

  const filledTrashIcons: number =
    (severityLevels.findIndex((x) => x === severity) || 0) + 1;

  const emptyTrashIcons: number = severityLevels.length - filledTrashIcons;

  return (
    <div className=" bg-white rounded-xl shadow-lg p-4 space-y-5 border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg">{"Title is missing"}</h2>
        <div className="flex space-x-2 items-center">
          <p className="text-sm text-blue-700">{progress || 0}%</p>
          <div className=" bg-gray-200 rounded-full h-2.5 w-24">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: (progress || 0) + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {[...Array(filledTrashIcons)].map((_, index) => (
            <MdDelete size={defaultIconSize} key={index} />
          ))}
          {[...Array(emptyTrashIcons)].map((_, index) => (
            <MdDeleteOutline size={defaultIconSize} key={index} />
          ))}
        </div>
        <div className="flex space-x-2 items-center">
          <p className="text-sm">{(radius || 0) + " m."}</p>
          <MdOutlineRadar size={defaultIconSize} />
        </div>
      </div>
    </div>
  );
};

export default PollutedLocationCard;
