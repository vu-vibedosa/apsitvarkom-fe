import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MdErrorOutline,
  MdOutlineChangeCircle,
  MdOutlineSave,
} from "react-icons/md";
import useCleaningEventFinalizeForm from "../../hooks/useCleaningEventFinalizeForm";
import CleaningEvent from "../../types/CleaningEvent";
import CleaningEventRow from "./CleaningEventRow";

interface Props {
  event: CleaningEvent;
  updateEvent: (newProgress: number) => void;
  currentProgress: number;
}

const CleaningEventFinalizeRow: React.FC<Props> = ({
  event,
  updateEvent,
  currentProgress,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    request,
    resetRequest,
    handleNewProgressOnchange,
    handleSubmit,
    isFormValid,
  } = useCleaningEventFinalizeForm({ event, currentProgress });

  useEffect(() => {
    if (!request) return;

    if (request.status === "success") {
      updateEvent(formData.newProgress.value || currentProgress);
    }
  }, [request, request?.status]);

  const renderRequest = () => {
    if (!request) return null;

    switch (request.status) {
      case "success":
        return null; // The create update row will be closed after onClick
      case "loading":
        return (
          <div className="flex justify-center items-center py-4 w-full">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-2xl animate-spin">
                <MdOutlineChangeCircle className="transform -scale-x-100" />
              </div>
              <div>{t("pleaseWait", "Please wait")}</div>
            </div>
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex flex-col justify-between py-4 w-full">
            <div className="grow flex flex-col justify-center items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>{t("error", "Error")}</div>
              <div>
                {t(
                  "cleaningEventFinalizeError",
                  "Failed to finalize the cleaning event"
                )}
              </div>
              <div className="my-2">
                <button
                  className="w-full bg-transparent md:hover:bg-red-500 text-red-700 font-medium md:hover:text-white py-2 px-4 border border-red-500 md:hover:border-transparent rounded"
                  onClick={resetRequest}
                >
                  {t("back", "Back")}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderForm = () => {
    return (
      <>
        <dt className="font-medium flex items-center">
          {t("newProgress", "New progress")}
        </dt>
        <dd className="text-gray-900 md:col-span-2">
          <input
            type="number"
            className={`rounded-md ${
              formData.newProgress.errors.length > 0
                ? "border-red-600"
                : "border-gray-300"
            }`}
            value={formData.newProgress.value}
            onChange={handleNewProgressOnchange}
          />
          {formData.newProgress.errors.map((error) => (
            <p className="mt-2 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </dd>
      </>
    );
  };

  return (
    <CleaningEventRow
      event={event}
      overrideContent={renderRequest()}
      additionalTableRows={renderForm()}
    >
      <div className="flex flex-row h-16 md:h-auto">
        <button
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border 
        border-green-600 bg-white text-green-700 shadow-sm md:hover:bg-green-50
        disabled:border-gray-600 disabled:text-gray-700 disabled:md:hover:bg-white"
          onClick={() => handleSubmit()}
          disabled={!isFormValid()}
        >
          <MdOutlineSave className="text-2xl text-center" />
        </button>
      </div>
    </CleaningEventRow>
  );
};

export default CleaningEventFinalizeRow;
