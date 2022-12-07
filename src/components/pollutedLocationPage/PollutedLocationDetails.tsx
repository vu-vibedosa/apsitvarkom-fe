import React from "react";
import { useTranslation } from "react-i18next";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";
import PollutedLocationTable from "./PollutedLocationTable";

const PollutedLocationDetails: React.FC<PollutedLocation> = ({
  radius,
  severity,
  progress,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <PollutedLocationTable
      progress={progress}
      severity={severityLevelsLocalized(t)[severity || severityLevels[0]]}
      radius={radius}
      notes={notes}
    />
  );
};

export default PollutedLocationDetails;
