import React from "react";

export interface PollutedLocationFormProps {
  coordinates: google.maps.LatLngLiteral;
}

const PollutedLocationForm: React.FC<PollutedLocationFormProps> = ({
  coordinates,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="font-medium text-lg text-center my-5">
          Report new location
        </h2>
        <div className="flex flex-col space-y-5 w-full">
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
                value={coordinates.lat}
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
                value={coordinates.lng}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea className="rounded-md border-gray-300 text-sm min-h-[50px] w-full" />
          </div>
        </div>
      </div>
      <button className="w-full bg-transparent md:hover:bg-green-500 text-green-700 font-medium md:hover:text-white py-2 px-4 border border-green-500 md:hover:border-transparent rounded">
        Submit
      </button>
    </div>
  );
};

export default PollutedLocationForm;
