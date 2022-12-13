import { useState } from "react";
import { useTranslation } from "react-i18next";
import { finalizeCleaningEvent } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import {
  CleaningEventFinalizeFormData,
  toCleaningEventFinalizeRequest,
} from "../types/backEnd/CleaningEventFinalizeRequest";
import CleaningEvent from "../types/CleaningEvent";
import { validate } from "../types/Validated";
import { isInteger, isRequired, minNumber } from "../utils/validationFunctions";

interface Props {
  event: CleaningEvent;
  currentProgress: number;
}

const useCleaningEventFinalizeForm = (props: Props) => {
  const { event, currentProgress } = props;
  const { t } = useTranslation();

  const [formData, setFormData] = useState<CleaningEventFinalizeFormData>({
    id: event.id || "",
    newProgress: {
      value: currentProgress + 1,
      validationFunctions: [
        (newValue, t) => isRequired(newValue, t),
        (newValue, t) =>
          newValue !== undefined ? isInteger(newValue, t) : undefined,
        (newValue, t) =>
          newValue !== undefined
            ? minNumber(newValue, t, currentProgress + 1)
            : undefined,
      ],
      errors: [],
    },
  });

  const isFormValid = () => {
    return formData.newProgress.errors.length === 0;
  };

  const [request, setRequest] = useState<ApiRequest<undefined> | undefined>();

  const resetRequest = () => {
    setRequest(undefined);
  };

  const handleNewProgressOnchange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((previousState) => ({
      ...previousState,
      newProgress: validate(
        formData.newProgress,
        e.target.value === "" ? undefined : +e.target.value,
        t
      ),
    }));
  };

  const handleSubmit = () => {
    setRequest({
      status: "loading",
    });

    const requestData = toCleaningEventFinalizeRequest(formData);

    finalizeCleaningEvent(requestData)
      .then(() => {
        setRequest({
          status: "success",
          data: undefined,
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
    handleNewProgressOnchange,
    handleSubmit,
    isFormValid,
  };
};

export default useCleaningEventFinalizeForm;
