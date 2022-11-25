import React, { useEffect, useState } from "react";
import { createPollutedLocation } from "../../backEndClient";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocationCreateRequest from "../../types/backEnd/PollutedLocationCreateRequest";
import { mapToPollutedLocation } from "../../types/backEnd/PollutedLocationResponse";
import PollutedLocation from "../../types/PollutedLocation";

export interface PollutedLocationFormProps {
  coordinates: google.maps.LatLngLiteral;
  setShowCenterMarker: (newValue: boolean) => void;
}

const PollutedLocationForm: React.FC<PollutedLocationFormProps> = ({
  coordinates,
  setShowCenterMarker,
}) => {
  const [createRequestData, setCreateRequestData] =
    useState<PollutedLocationCreateRequest>({
      radius: 1,
      severity: "low",
      location: {
        coordinates: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
      },
    });

  const [request, setRequest] = useState<
    ApiRequest<PollutedLocation> | undefined
  >();

  useEffect(() => {
    setCreateRequestData((previousState) => ({
      ...previousState,
      location: {
        ...previousState.location,
        coordinates: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        },
      },
    }));
  }, [coordinates]);

  useEffect(() => {
    setShowCenterMarker(true);

    return () => {
      setShowCenterMarker(false);
    };
  }, []);

  const submit = () => {
    setRequest({
      status: "loading",
    });
    setShowCenterMarker(false);

    createPollutedLocation(createRequestData)
      .then((response) => {
        setRequest({
          status: "success",
          data: mapToPollutedLocation(response.data),
        });
      })
      .catch(() => {
        setRequest({
          status: "error",
        });
      });
  };

  if (request) {
    return <div>{request.status}</div>;
  }

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
              Notes
            </label>
            <textarea className="rounded-md border-gray-300 text-sm min-h-[50px] w-full" />
          </div>

          <div>
            <input
              type="range"
              min={0}
              max={2}
              defaultValue={0}
              step={1}
              className="w-full h-2 bg-gray-300 rounded-md appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => submit()}
        className="w-full bg-transparent md:hover:bg-green-500 text-green-700 font-medium md:hover:text-white py-2 px-4 border border-green-500 md:hover:border-transparent rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default PollutedLocationForm;
