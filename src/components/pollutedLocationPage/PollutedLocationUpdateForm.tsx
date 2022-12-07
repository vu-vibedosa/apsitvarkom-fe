import React from "react";
import { useTranslation } from "react-i18next";
import { PollutedLocationUpdateFormData } from "../../types/backEnd/PollutedLocationUpdateRequest";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";
import PollutedLocationTable from "./PollutedLocationTable";

interface Props {
  pollutedLocation: PollutedLocation;
  formData: PollutedLocationUpdateFormData;
  handleSeverityOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRadiusOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNotesOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PollutedLocationUpdateForm: React.FC<Props> = ({
  pollutedLocation,
  formData,
  handleSeverityOnChange,
  handleRadiusOnChange,
  handleNotesOnChange,
}) => {
  const { t } = useTranslation();

  return (
    <form noValidate>
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
              }  shadow-sm w-full`}
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
            className="rounded-md border-gray-300 min-h-[100px] w-full"
            placeholder={t("optional", "Optional").toString()}
            value={formData.notes}
            onChange={handleNotesOnChange}
          />
        }
      />
    </form>
  );
};

export default PollutedLocationUpdateForm;
