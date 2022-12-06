import React from "react";
import { useTranslation } from "react-i18next";
import usePollutedLocationUpdateForm from "../../hooks/usePollutedLocationUpdateForm";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";
import PollutedLocationTable from "./PollutedLocationTable";

interface Props {
  pollutedLocation: PollutedLocation;
  updatePage: (updatedPollutedLocation: PollutedLocation) => void;
}

const PollutedLocationUpdateForm: React.FC<Props> = ({
  pollutedLocation,
  updatePage,
}) => {
  const {
    formData,
    request,
    resetRequest,
    handleSeverityOnChange,
    handleRadiusOnChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
  } = usePollutedLocationUpdateForm({ pollutedLocation, updatePage });

  const { t } = useTranslation();

  return (
    <PollutedLocationTable
      progress={pollutedLocation.progress}
      severity={
        <select
          value={formData.severity}
          onChange={handleSeverityOnChange}
          className="rounded-md border-gray-300 w-full"
        >
          {severityLevels.map((severityLevel) => (
            <option value={severityLevel} key={severityLevel}>
              {severityLevelsLocalized(t)[severityLevel]}
            </option>
          ))}
        </select>
      }
      radius={
        <>
          <input
            type="number"
            className={`rounded-md ${
              formData.radius.errors.length > 0
                ? "border-red-600"
                : "border-gray-300"
            }  shadow-sm text-sm w-full`}
            value={formData.radius.value}
            onChange={handleRadiusOnChange}
          />
          {formData.radius.errors.map((error) => (
            <p className="mt-2 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </>
      }
      notes={
        <textarea
          className="rounded-md border-gray-300 min-h-[50px] w-full"
          placeholder={t("optional", "Optional").toString()}
          value={formData.notes}
          onChange={handleNotesOnChange}
        />
      }
    />
  );
};

export default PollutedLocationUpdateForm;
