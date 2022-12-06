import React from "react";
import { useTranslation } from "react-i18next";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";
import PollutedLocationTable from "./PollutedLocationTable";

const PollutedLocationUpdateForm: React.FC<PollutedLocation> = ({
  radius,
  severity,
  progress,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <PollutedLocationTable
      progress={
        <input
          type={"text"}
          readOnly
          disabled
          className="rounded-md border-gray-300 bg-gray-200 shadow-sm text-sm w-full"
          value={progress}
        />
      }
      severity={severityLevelsLocalized(t)[severity || severityLevels[0]]}
      radius={radius}
      notes={notes}
    />
  );
};

export default PollutedLocationUpdateForm;
