import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import {
  PollutedLocationCreateForm,
  toPollutedLocationCreateRequest,
} from "../types/backEnd/PollutedLocationCreateRequest";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import PollutedLocation, {
  Coordinates,
  severityLevels,
} from "../types/PollutedLocation";
import { validate } from "../types/Validated";
import { isInteger, isRequired, minNumber } from "../utils/validationFunctions";

export interface PollutedLocationFormProps {
  coordinates: Coordinates;
  setShowCenterMarker: (newValue: boolean) => void;
  addCreatedPollutedLocation: (newLocation: PollutedLocation) => void;
}

const usePollutedLocationForm = ({
  coordinates,
  setShowCenterMarker,
  addCreatedPollutedLocation,
}: PollutedLocationFormProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<PollutedLocationCreateForm>({
    radius: {
      value: 5,
      errors: [],
      validationFunctions: [
        (newValue, t) => isRequired(newValue, t),
        (newValue, t) =>
          newValue !== undefined ? isInteger(newValue, t) : undefined,
        (newValue, t) =>
          newValue !== undefined ? minNumber(newValue, t, 1) : undefined,
      ],
    },
    severity: "low",
    location: {
      coordinates: {
        latitude: coordinates.latitude || 0,
        longitude: coordinates.longitude || 0,
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
          latitude: coordinates.latitude || 0,
          longitude: coordinates.longitude || 0,
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
      radius: validate(
        formData.radius,
        e.target.value === "" ? undefined : +e.target.value,
        t
      ),
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
