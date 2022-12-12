import i18next from "i18next";
import React, { useEffect, useMemo } from "react";
import DateTimePicker from "react-datetime-picker";
import { useTranslation } from "react-i18next";
import {
  MdErrorOutline,
  MdOutlineCancel,
  MdOutlineChangeCircle,
  MdOutlineSave,
} from "react-icons/md";
import useCleaningEventCreateForm from "../../hooks/useCleaningEventCreateForm";
import CleaningEvent from "../../types/CleaningEvent";

interface Props {
  onCancelClick: () => void;
  pollutedLocationId: string;
  updateUpcomingEvent: (newEvent: CleaningEvent) => void;
}

const CleaningEventCreateForm: React.FC<Props> = ({
  onCancelClick,
  pollutedLocationId,
  updateUpcomingEvent,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    handleStartTimeChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
    request,
    resetRequest,
  } = useCleaningEventCreateForm({
    pollutedLocationId,
  });
  const timeZone = useMemo(
    () => -(formData.startTime.value || new Date()).getTimezoneOffset() / 60,
    []
  );

  useEffect(() => {
    if (!request) return;

    if (request.status === "success") {
      updateUpcomingEvent(request.data);
    }
  }, [request, request?.status]);

  const renderRequest = () => {
    if (!request) return null;

    switch (request.status) {
      case "success":
        return null; // The create form will close automatically through useEffect
      case "loading":
        return (
          <div className="flex justify-center items-center my-4 w-full">
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
          <div className="flex flex-col justify-between my-4 w-full">
            <div className="grow flex flex-col justify-center items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>{t("error", "Error")}</div>
              <div>
                {t(
                  "cleaningEventCreateError",
                  "Failed to create the cleaning event"
                )}
              </div>
              <div className="my-2">
                <button
                  className="w-full bg-transparent md:hover:bg-red-500 text-red-700 font-medium md:hover:text-white py-2 px-4 border border-red-500 md:hover:border-transparent rounded"
                  onClick={() => resetRequest()}
                >
                  {t("retry", "Retry")}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  const formContent = () => (
    <>
      <form
        className="px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6 grow space-y-2 md:space-y-0"
        noValidate
      >
        <dt className="font-medium flex items-center">
          {t("startTime", "Start time")}
        </dt>
        <dd className="text-gray-900 md:col-span-2">
          <div className="flex items-center space-x-2">
            <DateTimePicker
              locale={i18next.language}
              clearIcon={null}
              disableClock
              value={formData.startTime.value || new Date()}
              onChange={(newValue: Date | null) =>
                handleStartTimeChange(newValue === null ? undefined : newValue)
              }
              showLeadingZeros
              disableCalendar
            />
            <div className="text-sm text-gray-600">
              UTC{timeZone >= 0 ? "+" + timeZone : timeZone}
            </div>
          </div>
          {formData.startTime.errors.map((error) => (
            <p className="mt-2 text-sm text-red-600" key={error}>
              {error}
            </p>
          ))}
        </dd>

        <>
          <dt className="font-medium flex items-center">
            {t("notes", "Notes")}
          </dt>
          <dd className="text-gray-900 md:col-span-2">
            <textarea
              className="rounded-md border-gray-300 min-h-[100px] w-full"
              placeholder={t("optional", "Optional").toString()}
              value={formData.notes}
              onChange={handleNotesOnChange}
            />
          </dd>
        </>
      </form>
      <div className="flex flex-row h-16 md:h-auto">
        <button
          disabled={!isFormValid()}
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border 
          border-green-600 bg-white text-green-700 shadow-sm md:hover:bg-green-50 
          disabled:border-gray-600 disabled:text-gray-700 disabled:md:hover:bg-white"
          onClick={() => handleSubmit()}
        >
          <MdOutlineSave className="text-2xl text-center" />
        </button>
        <button
          onClick={onCancelClick}
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
        >
          <MdOutlineCancel className="text-2xl" />
        </button>
      </div>
    </>
  );

  return (
    <div className="shadow md:rounded-lg flex flex-col md:flex-row bg-gray-50">
      {request ? renderRequest() : formContent()}
    </div>
  );
};

export default CleaningEventCreateForm;
