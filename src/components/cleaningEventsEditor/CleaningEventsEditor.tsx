import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CleaningEvent from "../../types/CleaningEvent";
import CleaningEventCreateRow from "./CleaningEventCreateRow";
import CleaningEventFinalizeRow from "./CleaningEventFinalizeRow";
import CleaningEventRow from "./CleaningEventRow";
import CleaningEventUpdateRow from "./CleaningEventUpdateRow";

interface Props {
  pollutedLocationId: string;
  progress: number;
  setNewProgress: (newProgress: number) => void;
  events?: CleaningEvent[];
}

const CleaningEventsEditor: React.FC<Props> = ({
  events = [],
  progress,
  pollutedLocationId,
  setNewProgress,
}) => {
  const { t } = useTranslation();
  const [finalizedEvents, setFinalizedEvents] = useState<CleaningEvent[]>(
    events
      .filter((e) => e.status === "finalized")
      .sort((e) => e.startTime?.getTime() || 0)
      .reverse()
  );

  const [upcomingEvent, setUpcomingEvent] = useState<CleaningEvent | undefined>(
    events.find((e) => e.status === "foreseen")
  );

  const [finishedEvent, setFinishedEvent] = useState<CleaningEvent | undefined>(
    events.find((e) => e.status === "finished")
  );

  const locationIsFullyProgressed = progress === 100;

  return (
    <div className="my-4 md:my-8 space-y-4">
      <h2 className="text-lg md:text-xl font-semibold md:font-bold my-2">
        {t("cleaningEventsTitle", "Cleaning events")}
      </h2>
      {!locationIsFullyProgressed && finishedEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsFinishedTitle", "Finished event")}
          </h2>

          <CleaningEventFinalizeRow
            event={finishedEvent}
            currentProgress={progress}
            updateEvent={(newProgress) => {
              setFinalizedEvents((prevState) => [finishedEvent, ...prevState]);
              setFinishedEvent(undefined);
              setNewProgress(newProgress);
            }}
          />
        </div>
      )}
      {!locationIsFullyProgressed && upcomingEvent && (
        <div>
          <h2 className="text-base md:text-lg font-medium md:font-semibold my-2">
            {t("cleaningEventsForeseenTitle", "Upcoming event")}
          </h2>

          <CleaningEventUpdateRow
            event={upcomingEvent}
            updateEvent={(newEvent) => setUpcomingEvent(newEvent)}
          />
        </div>
      )}
      {!locationIsFullyProgressed && !upcomingEvent && !finishedEvent && (
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

          <div className="md:rounded-lg">
            {finalizedEvents.map((e, i) => (
              <CleaningEventRow
                event={e}
                key={e.id}
                index={i}
                className="md:rounded-none"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CleaningEventsEditor;
