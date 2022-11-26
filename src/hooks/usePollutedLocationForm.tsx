import { useEffect, useState } from "react";
import { createPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import PollutedLocationCreateRequest from "../types/backEnd/PollutedLocationCreateRequest";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import PollutedLocation, { severityLevels } from "../types/PollutedLocation";
import { isNumber, minNumber } from "../utils/validationFunctions";

export interface PollutedLocationFormProps {
  coordinates: google.maps.LatLngLiteral;
  setShowCenterMarker: (newValue: boolean) => void;
}

const usePollutedLocationForm = ({
  coordinates,
  setShowCenterMarker,
}: PollutedLocationFormProps) => {
  const [createRequestData, setCreateRequestData] =
    useState<PollutedLocationCreateRequest>({
      radius: {
        value: 5,
        validationFunctions: [
          (newValue) => isNumber(newValue),
          (newValue) => minNumber(newValue, 1),
        ],
      },
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
    setShowCenterMarker(true);

    return () => {
      setShowCenterMarker(false);
    };
  }, []);

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

  const handleSeverityOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = severityLevels.find((l) => l === e.target.value);

    if (!newValue) return;

    setCreateRequestData((previousState) => ({
      ...previousState,
      severity: newValue,
    }));
  };

  const handleRadiusOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value;

    const errors: string[] = [];
    createRequestData.radius.validationFunctions.forEach((validation) => {
      const error = validation(newValue);
      if (error !== undefined) errors.push(error);
    });

    setCreateRequestData((previousState) => ({
      ...previousState,
      radius: {
        ...previousState.radius,
        value: newValue,
        errors: errors,
      },
    }));
  };

  const handleSubmit = () => {
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

  return {
    createRequestData,
    request,
    handleSeverityOnChange,
    handleRadiusOnChange,
    handleSubmit,
  };
};

export default usePollutedLocationForm;
