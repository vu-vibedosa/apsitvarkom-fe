import i18next from "i18next";
import React, { useMemo } from "react";
import DateTimePicker from "react-datetime-picker";
import { useTranslation } from "react-i18next";
import { MdOutlineDeleteForever, MdOutlineSave } from "react-icons/md";
import useCleaningEventCreateForm from "../../hooks/useCleaningEventCreateForm";

interface Props {
  onCancelClick: () => void;
  pollutedLocationId: string;
}

const CleaningEventCreateForm: React.FC<Props> = ({
  onCancelClick: onBackClick,
  pollutedLocationId,
}) => {
  const { t } = useTranslation();
  const {
    formData,
    handleStartTimeChange,
    handleNotesOnChange,
    handleSubmit,
    isFormValid,
  } = useCleaningEventCreateForm({
    pollutedLocationId,
  });
  const timeZone = useMemo(
    () => -(formData.startTime.value || new Date()).getTimezoneOffset() / 60,
    []
  );

  return (
    <div className="shadow md:rounded-lg flex flex-col md:flex-row bg-gray-50">
      <div className=" px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6 grow space-y-2 md:space-y-0">
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
              onChange={handleNotesOnChange}
            />
          </dd>
        </>
      </div>
      <div className="flex flex-row h-16 md:h-auto">
        <button
          disabled={!isFormValid()}
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border 
          border-green-600 bg-white text-green-700 shadow-sm md:hover:bg-green-50 
          disabled:border-gray-600 disabled:text-gray-700 disabled:md:hover:bg-white"
        >
          <MdOutlineSave className="text-2xl text-center" />
        </button>
        <button
          onClick={onBackClick}
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
        >
          <MdOutlineDeleteForever className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CleaningEventCreateForm;
