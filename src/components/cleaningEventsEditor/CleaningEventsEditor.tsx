import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CleaningEvent from "../../types/CleaningEvent";
import CleaningEventCreateRow from "./CleaningEventCreateRow";
import CleaningEventRow from "./CleaningEventRow";

interface Props {
  pollutedLocationId: string;
  progress: number;
  events?: CleaningEvent[];
}

const CleaningEventsEditor: React.FC<Props> = ({
  events = [],
  progress,
  pollutedLocationId,
}) => {
  const { t } = useTranslation();
  const finalizedEvents = events.filter((e) => e.status === "finalized");

  const [upcomingEvent, setUpcomingEvent] = useState<CleaningEvent | undefined>(
    events.find((e) => e.status === "foreseen")
  );

  const finishedEvent: CleaningEvent | undefined = events.find(
    (e) => e.status === "finished"
  );

  const isFullyProgressed = progress === 100;

  return (
    <div className="my-4 md:my-8 space-y-4">
      <h2 className="text-lg md:text-xl font-semibold md:font-bold my-2">
        {t("cleaningEventsTitle", "Cleaning events")}
      </h2>
      {!isFullyProgressed && finishedEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsFinishedTitle", "Finished event")}
          </h2>

          <CleaningEventRow event={finishedEvent} />
        </div>
      )}
      {!isFullyProgressed && upcomingEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsForeseenTitle", "Upcoming event")}
          </h2>

          <CleaningEventRow event={upcomingEvent} />
        </div>
      )}
      {!isFullyProgressed && !upcomingEvent && !finishedEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsForeseenTitle", "Upcoming event")}
          </h2>

          <CleaningEventCreateRow
            pollutedLocationId={pollutedLocationId}
            updateUpcomingEvent={(newEvent) => setUpcomingEvent(newEvent)}
          />
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
