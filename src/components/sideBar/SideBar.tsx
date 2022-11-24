import React, { useState } from "react";
import PollutedLocationForm, {
  PollutedLocationFormProps,
} from "../pollutedLocations/PollutedLocationForm";
import PollutedLocationList, {
  PollutedLocationListProps,
} from "../pollutedLocations/PollutedLocationList";

export const sideBarModes = ["list", "form"] as const;

interface Props {
  currentMode: typeof sideBarModes[number];
  setCurrentMode: (newCurrentMode: typeof sideBarModes[number]) => void;
}

const SideBar: React.FC<
  PollutedLocationListProps & PollutedLocationFormProps & Props
> = (props) => {
  const modeComponents: Record<typeof sideBarModes[number], React.ReactNode> = {
    list: <PollutedLocationList {...props} />,
    form: <PollutedLocationForm {...props} />,
  };
  const { currentMode, setCurrentMode } = props;

  const controls = () => {
    switch (currentMode) {
      case "list":
        return (
          <button
            className="w-full bg-transparent md:hover:bg-green-500 text-green-700 font-medium md:hover:text-white py-2 px-4 border border-green-500 md:hover:border-transparent rounded"
            onClick={() => setCurrentMode("form")}
          >
            Report new
          </button>
        );
      case "form":
        return (
          <button
            className="w-full bg-transparent md:hover:bg-gray-500 text-gray-700 font-medium md:hover:text-white py-2 px-4 border border-gray-500 md:hover:border-transparent rounded"
            onClick={() => setCurrentMode("list")}
          >
            Back to list
          </button>
        );
    }
  };

  return (
    <div className="h-2/3 md:h-full flex flex-col flex-1 md:flex-none">
      <div className="w-full md:w-96 flex-1 overflow-y-auto">
        <div className="p-4 h-full">{modeComponents[currentMode]}</div>
      </div>
      <div className="p-4 flex-none">{controls()}</div>
    </div>
  );
};

export default SideBar;
