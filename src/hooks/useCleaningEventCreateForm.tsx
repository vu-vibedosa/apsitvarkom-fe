import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createCleaningEvent } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import {
  CleaningEventCreateFormData,
  toCleaningEventCreateRequest,
} from "../types/backEnd/CleaningEventCreateRequest";
import { mapToCleaningEvent } from "../types/backEnd/CleaningEventResponse";
import CleaningEvent from "../types/CleaningEvent";
import { validate } from "../types/Validated";
import { isInTheFuture, isRequired } from "../utils/validationFunctions";

interface Props {
  pollutedLocationId: string;
}

const useCleaningEventCreateForm = (props: Props) => {
  const { pollutedLocationId } = props;
  const { t } = useTranslation();

  const [formData, setFormData] = useState<CleaningEventCreateFormData>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return {
      pollutedLocationId,
      startTime: {
        value: date,
        validationFunctions: [
          (newValue, t) => isRequired(newValue, t),
          (newValue, t) =>
            newValue !== undefined ? isInTheFuture(newValue, t) : undefined,
        ],
        errors: [],
      },
    };
  });

  const isFormValid = () => {
    return formData.startTime.errors.length === 0;
  };

  const [request, setRequest] = useState<
    ApiRequest<CleaningEvent> | undefined
  >();

  const resetRequest = () => {
    setRequest(undefined);
  };

  const handleStartTimeChange = (newValue: Date | undefined) => {
    setFormData((previousState) => ({
      ...previousState,
      startTime: validate(formData.startTime, newValue, t),
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

    const requestData = toCleaningEventCreateRequest(formData);

    createCleaningEvent(requestData)
      .then((response) => {
        const newCleaningEvent = mapToCleaningEvent(response.data);
        setRequest({
          status: "success",
          data: newCleaningEvent,
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
    handleStartTimeChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
  };
};

export default useCleaningEventCreateForm;
