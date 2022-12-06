import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import supportedLanguages from "../../languages";
import PollutedLocation from "../../types/PollutedLocation";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDirections } from "react-icons/md";

const PollutedLocationHeader: React.FC<PollutedLocation> = ({ location }) => {
  const { t } = useTranslation();
  const currentLanguage =
    supportedLanguages.find((x) => x === i18next.language) ||
    supportedLanguages[0];

  return (
    <div className="my-2 md:my-8 flex flex-col md:flex-row space-y-2 md:space-x-8 md:items-center justify-between">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold md:font-bold leading-5">
          {location?.title?.[currentLanguage] ||
            t("titleMissing", "Title is missing")}
        </h1>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="px-4 py-2 flex items-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm md:hover:bg-gray-50"
        >
          <MdOutlineEdit className="text-xl mr-1" />
          {t("edit", "Edit")}
        </button>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location?.coordinates?.latitude},${location?.coordinates?.longitude}`}
          type="button"
          className="px-4 py-2 flex items-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm md:hover:bg-gray-50"
        >
          <MdOutlineDirections className="text-xl mr-1" />
          {t("directions", "Directions")}
        </a>
      </div>
    </div>
  );
};

export default PollutedLocationHeader;
