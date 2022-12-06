import React from "react";
import { useTranslation } from "react-i18next";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";

const PollutedLocationDetails: React.FC<PollutedLocation> = ({
  radius,
  severity,
  progress,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{radius}</div>
      <div>{severityLevelsLocalized(t)[severity || severityLevels[0]]}</div>
      <div>{progress}</div>
      <div>{notes}</div>
    </div>
  );
};

export default PollutedLocationDetails;
