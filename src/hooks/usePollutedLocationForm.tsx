import { useEffect, useState } from "react";
import { createPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import {
  PollutedLocationCreateForm,
  toPollutedLocationCreateRequest,
} from "../types/backEnd/PollutedLocationCreateRequest";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import PollutedLocation, { severityLevels } from "../types/PollutedLocation";
import { validate } from "../types/Validated";
import { isInteger, minNumber } from "../utils/validationFunctions";

export interface PollutedLocationFormProps {
  coordinates: google.maps.LatLngLiteral;
  setShowCenterMarker: (newValue: boolean) => void;
  addCreatedPollutedLocation: (newLocation: PollutedLocation) => void;
}

const usePollutedLocationForm = ({
  coordinates,
  setShowCenterMarker,
  addCreatedPollutedLocation,
}: PollutedLocationFormProps) => {
  const [formData, setFormData] = useState<PollutedLocationCreateForm>({
    radius: {
      value: 5,
      errors: [],
      validationFunctions: [
        (newValue) => isInteger(newValue),
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

  const isFormValid = () => {
    return formData.radius.errors.length === 0;
  };

  const [request, setRequest] = useState<
    ApiRequest<PollutedLocation> | undefined
  >();

  const resetRequest = () => {
    setRequest(undefined);
    setShowCenterMarker(true);
  };

  useEffect(() => {
    setShowCenterMarker(true);

    return () => {
      setShowCenterMarker(false);
    };
  }, []);

  useEffect(() => {
    setFormData((previousState) => ({
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

    setFormData((previousState) => ({
      ...previousState,
      severity: newValue,
    }));
  };

  const handleRadiusOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((previousState) => ({
      ...previousState,
      radius: validate(formData.radius, +e.target.value),
    }));
  };

  const handleNotesOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((previousState) => ({
      ...previousState,
      notes: e.target.value === "" ? undefined : e.target.value,
    }));
  };

  const handleSubmit = () => {
    setRequest({
      status: "loading",
    });
    setShowCenterMarker(false);

    const requestData = toPollutedLocationCreateRequest(formData);

    createPollutedLocation(requestData)
      .then((response) => {
        const createdPollutedLocation = mapToPollutedLocation(response.data);
        addCreatedPollutedLocation(createdPollutedLocation);
        setRequest({
          status: "success",
          data: createdPollutedLocation,
        });
      })
      .catch(() => {
        setRequest({
          status: "error",
        });
      });
  };

  return {
    formData,
    request,
    resetRequest,
    handleSeverityOnChange,
    handleRadiusOnChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
  };
};

export default usePollutedLocationForm;