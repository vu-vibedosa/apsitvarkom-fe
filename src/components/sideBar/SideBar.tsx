import React, { useState } from "react";
import { Trans } from "react-i18next";
import { PollutedLocationFormProps } from "../../hooks/usePollutedLocationForm";
import PollutedLocationForm from "../pollutedLocations/PollutedLocationForm";
import PollutedLocationList, {
  PollutedLocationListProps,
} from "../pollutedLocations/PollutedLocationList";

const SideBar: React.FC<
  PollutedLocationListProps & PollutedLocationFormProps
> = (props) => {
  const [mode, setMode] = useState<typeof modes[number]>("list");

  const modes = ["list", "form"] as const;
  const modeComponents: Record<typeof modes[number], React.ReactNode> = {
    list: <PollutedLocationList {...props} />,
    form: <PollutedLocationForm {...props} />,
  };

  const controls = () => {
    switch (mode) {
      case "list":
        return (
          <button
            className="w-full bg-transparent md:hover:bg-green-500 text-green-700 font-medium md:hover:text-white py-2 px-4 border border-green-500 md:hover:border-transparent rounded"
            onClick={() => setMode("form")}
          >
            <Trans i18nKey={"reportNew"}>Report new</Trans>
          </button>
        );
      case "form":
        return (
          <button
            className="w-full bg-transparent md:hover:bg-gray-500 text-gray-700 font-medium md:hover:text-white py-2 px-4 border border-gray-500 md:hover:border-transparent rounded"
            onClick={() => setMode("list")}
          >
            Back to list
          </button>
        );
    }
  };

  return (
    <div className="h-2/3 md:h-full flex flex-col flex-1 md:flex-none">
      <div className="w-full md:w-96 flex-1 overflow-y-auto">
        <div className="p-4 h-full">{modeComponents[mode]}</div>
      </div>
      <div className="p-4 flex-none">{controls()}</div>
    </div>
  );
};

export default SideBar;
