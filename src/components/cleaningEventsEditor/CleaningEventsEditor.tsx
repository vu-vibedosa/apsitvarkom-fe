import React from "react";
import { useTranslation } from "react-i18next";
import CleaningEvent from "../../types/CleaningEvent";
import CleaningEventRow from "./CleaningEventRow";

interface Props {
  events?: CleaningEvent[];
}

const CleaningEventsEditor: React.FC<Props> = ({ events = [] }) => {
  const { t } = useTranslation();
  const finalizedEvents = events.filter((e) => e.status === "finalized");
  const upcomingEvent: CleaningEvent | undefined = events.find(
    (e) => e.status === "foreseen"
  );
  const finishedEvent: CleaningEvent | undefined = events.find(
    (e) => e.status === "finished"
  );

  return (
    <div className="my-4 md:my-8 space-y-4">
      <h2 className="text-lg md:text-xl font-semibold md:font-bold my-2">
        {t("cleaningEventsTitle", "Cleaning events")}
      </h2>
      {finishedEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsFinishedTitle", "Finished event")}
          </h2>

          <CleaningEventRow event={finishedEvent} />
        </div>
      )}
      {upcomingEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsForeseenTitle", "Upcoming event")}
          </h2>

          <CleaningEventRow event={upcomingEvent} />
        </div>
      )}
      {finalizedEvents.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsFinalizedTitle", "Past events")}
          </h2>

          {finalizedEvents.map((e, i) => (
            <CleaningEventRow event={e} key={e.id} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CleaningEventsEditor;
