import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import CleaningEvent from "../../types/CleaningEvent";

interface Props {
  event: CleaningEvent;
  index?: number;
  children?: React.ReactNode;
  overrideContent?: React.ReactNode;
  additionalTableRows?: React.ReactNode;
  className?: string;
}

const CleaningEventRow: React.FC<Props> = ({
  event,
  index = 0,
  children,
  overrideContent,
  additionalTableRows,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        index % 2 == 0 ? "bg-gray-50" : "bg-white"
      } shadow md:rounded-lg ${className}`}
    >
      {overrideContent ? (
        overrideContent
      ) : (
        <dl className="flex flex-col md:flex-row">
          <div className="px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6 grow">
            <dt className="font-medium flex items-center">
              {t("startTime", "Start time")}
            </dt>
            <dd className="text-gray-900 md:col-span-2">
              {event.startTime?.toLocaleString(i18next.language, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>

            {event.notes && (
              <>
                <dt className="font-medium flex items-center">
                  {t("notes", "Notes")}
                </dt>
                <dd className="text-gray-900 md:col-span-2">{event.notes}</dd>
              </>
            )}

            {additionalTableRows}
          </div>
          {children}
        </dl>
      )}
    </div>
  );
};

export default CleaningEventRow;
