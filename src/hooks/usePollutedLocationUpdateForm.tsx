import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updatePollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import {
  PollutedLocationUpdateForm,
  toPollutedLocationUpdateRequest,
} from "../types/backEnd/PollutedLocationUpdateRequest";
import PollutedLocation, { severityLevels } from "../types/PollutedLocation";
import { validate } from "../types/Validated";
import { isInteger, isRequired, minNumber } from "../utils/validationFunctions";

interface Props {
  updatePage: (updatedPollutedLocation: PollutedLocation) => void;
  pollutedLocation: PollutedLocation;
}

const usePollutedLocationUpdateForm = (props: Props) => {
  const { updatePage, pollutedLocation } = props;
  const { t } = useTranslation();

  const [formData, setFormData] = useState<PollutedLocationUpdateForm>({
    id: pollutedLocation.id || "",
    radius: {
      value: pollutedLocation.radius || 5,
      errors: [],
      validationFunctions: [
        (newValue, t) => isRequired(newValue, t),
        (newValue, t) =>
          newValue !== undefined ? isInteger(newValue, t) : undefined,
        (newValue, t) =>
          newValue !== undefined ? minNumber(newValue, t, 1) : undefined,
      ],
    },
    severity: pollutedLocation.severity || "low",
    notes: pollutedLocation.notes,
  });

  const isFormValid = () => {
    return formData.radius.errors.length === 0;
  };

  const [request, setRequest] = useState<
    ApiRequest<PollutedLocation> | undefined
  >();

  const resetRequest = () => {
    setRequest(undefined);
  };

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

    const requestData = toPollutedLocationUpdateRequest(formData);

    updatePollutedLocation(requestData)
      .then((response) => {
        const updatedPollutedLocation = mapToPollutedLocation(response.data);
        updatePage(updatedPollutedLocation);
        setRequest({
          status: "success",
          data: updatedPollutedLocation,
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

export default usePollutedLocationUpdateForm;
