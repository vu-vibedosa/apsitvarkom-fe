import React, { useState } from "react";
import PollutedLocationForm from "../pollutedLocations/PollutedLocationForm";
import PollutedLocationList, {
  PollutedLocationListProps,
} from "../pollutedLocations/PollutedLocationList";

const SideBar: React.FC<PollutedLocationListProps> = (
  pollutedLocationListProps
) => {
  const modes = ["list", "form"] as const;
  const modeComponents: Record<typeof modes[number], React.ReactNode> = {
    list: <PollutedLocationList {...pollutedLocationListProps} />,
    form: <PollutedLocationForm />,
  };

  const [mode, setMode] = useState<typeof modes[number]>("list");

  const controls = () => {
    switch (mode) {
      case "list":
        return <button onClick={() => setMode("form")}>Report new</button>;
      case "form":
        return <button onClick={() => setMode("list")}>Back to list</button>;
    }
  };

  return (
    <div className="h-2/3 md:h-full flex flex-col flex-1 md:flex-none">
      <div className="w-full md:w-96 flex-1 overflow-y-auto">
        <div className="m-4">{modeComponents[mode]}</div>
      </div>
      <div className="px-4 py-8 flex-none">{controls()}</div>
    </div>
  );
};

export default SideBar;
