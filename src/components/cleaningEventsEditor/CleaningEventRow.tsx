import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import CleaningEvent from "../../types/CleaningEvent";

interface Props {
  event: CleaningEvent;
  index?: number;
}

const CleaningEventRow: React.FC<Props> = ({ event, index = 0 }) => {
  const { t } = useTranslation();

  return (
    <div className="shadow md:rounded-lg">
      <dl>
        <div
          className={`${
            index % 2 == 0 ? "bg-gray-50" : "bg-white"
          } px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6`}
        >
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
      </dl>
    </div>
  );
};

export default CleaningEventRow;
