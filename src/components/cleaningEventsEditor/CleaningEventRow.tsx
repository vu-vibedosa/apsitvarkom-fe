import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineDeleteForever, MdOutlineEdit } from "react-icons/md";
import CleaningEvent from "../../types/CleaningEvent";

interface Props {
  event: CleaningEvent;
  index?: number;
}

const CleaningEventRow: React.FC<Props> = ({ event, index = 0 }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        index % 2 == 0 ? "bg-gray-50" : "bg-white"
      } shadow md:rounded-lg`}
    >
      <dl className="flex flex-col md:flex-row">
        <div className="px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6 grow">
          <dt className="font-medium flex items-center">
            {t("startTime", "Start time")}
          </dt>
          <dd className="text-gray-900 md:col-span-2">
            {event.startTime?.toLocaleString(i18next.language)}
          </dd>

          {event.notes && (
            <>
              <dt className="font-medium flex items-center">
                {t("notes", "Notes")}
              </dt>
              <dd className="text-gray-900 md:col-span-2">{event.notes}</dd>
            </>
          )}
        </div>
        <div className="flex flex-row h-16 md:h-auto">
          <button
            className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border 
          border-green-600 bg-white text-green-700 shadow-sm md:hover:bg-green-50"
          >
            <MdOutlineEdit className="text-2xl text-center" />
          </button>
          <button className="w-full md:w-16 flex justify-center items-center m-2 rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50">
            <MdOutlineDeleteForever className="text-2xl" />
          </button>
        </div>
      </dl>
    </div>
  );
};

export default CleaningEventRow;
