import React from "react";
import usePollutedLocationForm, {
  PollutedLocationFormProps,
} from "../../hooks/usePollutedLocationForm";
import { severityLevels } from "../../types/PollutedLocation";
import PollutedLocationFormResult from "./PollutedLocationFormResult";

const PollutedLocationForm: React.FC<PollutedLocationFormProps> = (props) => {
  const {
    formData,
    request,
    resetRequest,
    handleSeverityOnChange,
    handleSubmit,
    handleRadiusOnChange,
    handleNotesOnChange,
    isFormValid,
  } = usePollutedLocationForm(props);

  if (request) {
    return (
      <PollutedLocationFormResult
        request={request}
        resetRequest={resetRequest}
      />
    );
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="font-medium text-lg text-center my-5">
          Report new location
        </h2>
        <form className="flex flex-col space-y-5 w-full" noValidate>
          <div className="flex flex-row space-x-2">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type={"text"}
                readOnly
                disabled
                className="rounded-md border-gray-300 bg-gray-200 shadow-sm text-sm w-full"
                value={formData.location.coordinates.latitude}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type={"text"}
                readOnly
                disabled
                className="rounded-md border-gray-300 bg-gray-200 shadow-sm text-sm w-full"
                value={formData.location.coordinates.longitude}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Radius (meters)
            </label>
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
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <select
              value={formData.severity}
              onChange={handleSeverityOnChange}
              className="rounded-md border-gray-300 w-full"
            >
              {severityLevels.map((severityLevel) => (
                <option value={severityLevel} key={severityLevel}>
                  {severityLevel.charAt(0).toUpperCase() +
                    severityLevel.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              className="rounded-md border-gray-300 text-sm min-h-[50px] w-full"
              placeholder="Optional"
              value={formData.notes}
              onChange={handleNotesOnChange}
            />
          </div>
        </form>
      </div>
      <button
        disabled={!isFormValid()}
        onClick={() => handleSubmit()}
        className="w-full rounded font-medium py-2 px-4 border bg-transparent
                  enabled:md:hover:bg-green-500 text-green-700 enabled:md:hover:text-white border-green-500 enabled:md:hover:border-transparent
                  disabled:text-red-700 disabled:border-red-500"
      >
        {isFormValid() ? "Submit" : "There are errors in the form"}
      </button>
    </div>
  );
};

export default PollutedLocationForm;
