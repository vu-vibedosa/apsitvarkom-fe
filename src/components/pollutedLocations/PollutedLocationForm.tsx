import React from "react";
import usePollutedLocationForm, {
  PollutedLocationFormProps,
} from "../../hooks/usePollutedLocationForm";
import { severityLevels } from "../../types/PollutedLocation";

const PollutedLocationForm: React.FC<PollutedLocationFormProps> = (props) => {
  const {
    createRequestData,
    request,
    handleSeverityOnChange,
    handleSubmit,
    handleRadiusOnChange,
  } = usePollutedLocationForm(props);

  if (request) {
    return <div>{request.status}</div>;
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
                value={createRequestData.location.coordinates.latitude}
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
                value={createRequestData.location.coordinates.longitude}
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
                createRequestData.radius.errors &&
                createRequestData.radius.errors.length > 0
                  ? "border-red-600"
                  : "border-gray-300"
              }  shadow-sm text-sm w-full`}
              value={createRequestData.radius.value}
              onChange={handleRadiusOnChange}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <select
              value={createRequestData.severity}
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
              value={createRequestData.notes}
            />
          </div>
        </form>
      </div>
      <button
        onClick={() => handleSubmit()}
        className="w-full bg-transparent md:hover:bg-green-500 text-green-700 font-medium md:hover:text-white py-2 px-4 border border-green-500 md:hover:border-transparent rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default PollutedLocationForm;
