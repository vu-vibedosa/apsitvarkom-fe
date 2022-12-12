import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CleaningEventCreateForm from "./CleaningEventCreateForm";

interface Props {
  pollutedLocationId: string;
}

const CleaningEventCreateRow: React.FC<Props> = ({ pollutedLocationId }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState<boolean>(false);

  return showForm ? (
    <CleaningEventCreateForm
      onCancelClick={() => setShowForm(false)}
      pollutedLocationId={pollutedLocationId}
    />
  ) : (
    <button
      className="w-full flex shadow md:rounded-lg flex-col items-center px-4 py-5 md:px-6 border border-gray-500 md:hover:shadow-lg md:duration-100"
      onClick={() => setShowForm(true)}
    >
      <div>
        {t(
          "cleaningEventsCreateMessage",
          "This polluted location does not have an upcoming event"
        )}
      </div>
      <div className="font-medium">
        {t("cleaningEventsCreateButton", "Click here to plan one")}
      </div>
    </button>
  );
};

export default CleaningEventCreateRow;
