import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { RiLogoutCircleRFill } from "react-icons/ri";

type PollutedLocationType = Partial<{
  id: string;
  title: string;
  location: Partial<{
    longitude: number;
    latitude: number;
  }>;
  radius: number;
  severity: string;
  spotted: string;
  progress: number;
  notes: string;
}>;

const PollutedLocationCard: React.FC<PollutedLocationType> = ({
  title,
  radius,
  progress,
}) => {
  return (
    <div className="mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 sm:w-1/4 md:w-4/5 lg:w-1/4 px-2">
      <div className="flex flex-col w-full">
        <div className="flex flex-row space-x-4">
          <div className="w-1/2 font-bold">
            <h1>{title || "Title is missing"}</h1>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-700 dark:text-white">
                {progress || 0}%
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: progress + "%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-row justify-between">
            <BsTrashFill size={35} />
            <BsTrash size={35} />
            <BsTrash size={35} />
          </div>
          <div className="w-1/5 content-end">
            <div className="flex items-stretch">
              <div className="mt-1">{radius + "m." || 0 + "m."}</div>
              <RiLogoutCircleRFill size={35} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollutedLocationCard;
