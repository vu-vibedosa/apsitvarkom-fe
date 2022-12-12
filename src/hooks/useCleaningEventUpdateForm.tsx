import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateCleaningEvent } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import { mapToCleaningEvent } from "../types/backEnd/CleaningEventResponse";
import {
  CleaningEventUpdateFormData,
  toCleaningEventUpdateRequest,
} from "../types/backEnd/CleaningEventUpdateRequest";
import CleaningEvent from "../types/CleaningEvent";
import { validate } from "../types/Validated";
import { isInTheFuture, isRequired } from "../utils/validationFunctions";

interface Props {
  event: CleaningEvent;
}

const useCleaningEventUpdateForm = (props: Props) => {
  const { event } = props;
  const { t } = useTranslation();

  const getCurrentCleaningEventUpdateFormData: () => CleaningEventUpdateFormData =
    () => {
      return {
        id: event.id || "",
        startTime: {
          value: event.startTime,
          validationFunctions: [
            (newValue, t) => isRequired(newValue, t),
            (newValue, t) =>
              newValue !== undefined ? isInTheFuture(newValue, t) : undefined,
          ],
          errors: [],
        },
        notes: event.notes,
      };
    };

  const [formData, setFormData] = useState<CleaningEventUpdateFormData>(
    getCurrentCleaningEventUpdateFormData()
  );

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

    const requestData = toCleaningEventUpdateRequest(formData);

    updateCleaningEvent(requestData)
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

export default useCleaningEventUpdateForm;
