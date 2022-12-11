import React from "react";
import CleaningEvent from "../../types/CleaningEvent";

interface Props {
  events?: CleaningEvent[];
}

const CleaningEventsEditor: React.FC<Props> = ({ events = [] }) => {
  return (
    <div>
      {events.map((e) => (
        <div key={e.id}>
          <div>{e.startTime?.toString()}</div>
          <div>{e.status}</div>
        </div>
      ))}
    </div>
  );
};

export default CleaningEventsEditor;
