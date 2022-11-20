import React from "react";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRadar } from "react-icons/md";
import PollutedLocation, { severityLevels } from "../../types/PollutedLocation";

const defaultIconSize = 35;

const PollutedLocationCard: React.FC<PollutedLocation> = ({
  location,
  radius,
  progress,
  severity,
}) => {
  const filledTrashIcons: number =
    (severityLevels.findIndex((x) => x === severity) || 0) + 1;

  const emptyTrashIcons: number = severityLevels.length - filledTrashIcons;

  return (
    <CardLayout
      title={
        <h2 className="text-lg">{location?.title || "Title is missing"}</h2>
      }
      progressText={<p className="text-sm text-blue-700">{progress || 0}%</p>}
      progressBar={
        <div className=" bg-gray-200 rounded-full h-2.5 w-24">
          <div
            className="bg-blue-600 h-full rounded-full"
            style={{ width: (progress || 0) + "%" }}
          ></div>
        </div>
      }
      severity={
        <>
          {[...Array(filledTrashIcons)].map((_, index) => (
            <MdDelete size={defaultIconSize} key={index} />
          ))}
          {[...Array(emptyTrashIcons)].map((_, index) => (
            <MdDeleteOutline size={defaultIconSize} key={index} />
          ))}
        </>
      }
      radiusText={<p className="text-sm">{(radius || 0) + " m."}</p>}
      radiusIcon={<MdOutlineRadar size={defaultIconSize} />}
    />
  );
};

export const PollutedLocationCardLoading: React.FC = () => {
  const iconMultiplier = 0.85;

  const randomNumber = () => {
    const min = 70;
    const max = 100;
    return Math.floor(min + Math.random() * (max - min));
  };

  return (
    <CardLayout
      title={
        <div className="w-full">
          <div
            className="h-6 bg-slate-200 rounded animate-pulse"
            style={{ width: randomNumber() + "%" }}
          />
        </div>
      }
      progressText={
        <div className="h-5 w-5 bg-slate-200 rounded animate-pulse" />
      }
      progressBar={
        <div className="h-2.5 w-24 bg-slate-200 rounded animate-pulse" />
      }
      severity={
        <div
          className="h-6 bg-slate-200 rounded animate-pulse"
          style={{
            width:
              defaultIconSize * iconMultiplier * severityLevels.length + "px",
          }}
        />
      }
      radiusText={
        <div className="h-5 w-8 bg-slate-200 rounded animate-pulse" />
      }
      radiusIcon={
        <div
          className="h-6 bg-slate-200 rounded-full animate-pulse"
          style={{
            width: defaultIconSize * iconMultiplier + "px",
            height: defaultIconSize * iconMultiplier + "px",
          }}
        />
      }
    />
  );
};

const CardLayout: React.FC<{
  title: React.ReactNode;
  progressText: React.ReactNode;
  progressBar: React.ReactNode;
  severity: React.ReactNode;
  radiusText: React.ReactNode;
  radiusIcon: React.ReactNode;
}> = ({
  title,
  progressText,
  progressBar,
  severity,
  radiusText,
  radiusIcon,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-4 space-y-5 border border-gray-200">
    <div className="flex justify-between items-center space-x-2">
      {title}
      <div className="flex space-x-2 items-center">
        {progressText}
        {progressBar}
      </div>
    </div>
    <div className="flex justify-between items-center space-x-2">
      <div className="flex -space-x-2">{severity}</div>
      <div className="flex space-x-2 items-center">
        {radiusText}
        {radiusIcon}
      </div>
    </div>
  </div>
);

export default PollutedLocationCard;
