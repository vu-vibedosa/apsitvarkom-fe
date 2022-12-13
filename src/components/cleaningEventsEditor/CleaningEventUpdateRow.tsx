import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdErrorOutline,
  MdOutlineChangeCircle,
  MdOutlineDeleteForever,
  MdOutlineEdit,
} from "react-icons/md";
import { deleteCleaningEvent } from "../../backEndClient";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import CleaningEvent from "../../types/CleaningEvent";
import CleaningEventRow from "./CleaningEventRow";
import CleaningEventUpdateForm from "./CleaningEventUpdateForm";

interface Props {
  event: CleaningEvent;
  updateEvent: (newEvent: CleaningEvent | undefined) => void;
}

const CleaningEventUpdateRow: React.FC<Props> = ({ event, updateEvent }) => {
  const { t } = useTranslation();
  const [deleteRequest, setDeleteRequest] = useState<
    ApiRequest<undefined> | undefined
  >();
  const [showForm, setShowForm] = useState<boolean>(false);

  const renderDeleteRequest = () => {
    if (!deleteRequest) return null;

    switch (deleteRequest.status) {
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
                  "cleaningEventDeleteError",
                  "Failed to delete the cleaning event"
                )}
              </div>
              <div className="my-2">
                <button
                  className="w-full bg-transparent md:hover:bg-red-500 text-red-700 font-medium md:hover:text-white py-2 px-4 border border-red-500 md:hover:border-transparent rounded"
                  onClick={() => setDeleteRequest(undefined)}
                >
                  {t("back", "Back")}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return showForm ? (
    <CleaningEventUpdateForm
      closeForm={() => setShowForm(false)}
      updateEvent={updateEvent}
      event={event}
    />
  ) : (
    <CleaningEventRow event={event} overrideContent={renderDeleteRequest()}>
      <div className="flex flex-row h-16 md:h-auto">
        <button
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border 
        border-blue-600 bg-white text-blue-700 shadow-sm md:hover:bg-blue-50"
          onClick={() => setShowForm(true)}
        >
          <MdOutlineEdit className="text-2xl text-center" />
        </button>
        <button
          className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
          onClick={async () => {
            if (!event.id) return;

            setDeleteRequest({ status: "loading" });
            deleteCleaningEvent(event.id)
              .then(() => {
                setDeleteRequest({
                  status: "success",
                  data: undefined,
                });
                updateEvent(undefined);
              })
              .catch(() => {
                setDeleteRequest({ status: "error" });
              });
          }}
        >
          <MdOutlineDeleteForever className="text-2xl" />
        </button>
      </div>
    </CleaningEventRow>
  );
};

export default CleaningEventUpdateRow;
