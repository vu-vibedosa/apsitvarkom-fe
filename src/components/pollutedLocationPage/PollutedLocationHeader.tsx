import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import supportedLanguages from "../../languages";
import PollutedLocation from "../../types/PollutedLocation";
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineDirections,
  MdOutlineCancel,
  MdOutlineSave,
} from "react-icons/md";
import { deletePollutedLocation } from "../../backEndClient";
import { useNavigate } from "react-router-dom";
import { pollutedLocationPageModes } from "../../pages/PollutedLocationPage";

interface Props {
  currentMode: typeof pollutedLocationPageModes[number];
  setMode: (newMode: typeof pollutedLocationPageModes[number]) => void;
}

const PollutedLocationHeader: React.FC<Props & PollutedLocation> = ({
  id,
  location,
  spotted,
  currentMode,
  setMode,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguage =
    supportedLanguages.find((x) => x === i18next.language) ||
    supportedLanguages[0];

  return (
    <div className="my-4 md:my-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 md:items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold leading-8">
          {location?.title?.[currentLanguage] ||
            t("titleMissing", "Title is missing")}
        </h1>
        <div className="text-sm text-gray-400">
          {spotted?.toLocaleString(i18next.language)}
        </div>
      </div>
      <div className="flex space-x-4 md:my-auto flex-wrap">
        {currentMode === "view" && (
          <button
            type="button"
            className="px-2 md:px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-blue-300 bg-white text-blue-700 shadow-sm md:hover:bg-blue-50"
            onClick={() => setMode("edit")}
          >
            <MdOutlineEdit className="text-xl mr-1" />
            {t("edit", "Edit")}
          </button>
        )}
        {currentMode === "edit" && (
          <>
            <button
              type="button"
              className="px-2 md:px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-green-600 bg-white text-green-700 shadow-sm md:hover:bg-green-50"
              onClick={() => setMode("view")}
            >
              <MdOutlineSave className="text-xl mr-1" />
              {t("save", "Save")}
            </button>
            <button
              type="button"
              className="px-2 md:px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
              onClick={() => setMode("view")}
            >
              <MdOutlineCancel className="text-xl mr-1" />
              {t("cancel", "Cancel")}
            </button>
          </>
        )}
        {currentMode === "view" && (
          <button
            type="button"
            className="px-2 md:px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
            onClick={async () => {
              if (!id) return;

              await deletePollutedLocation(id);
              navigate("/");
            }}
          >
            <MdOutlineDeleteForever className="text-xl mr-1" />
            {t("delete", "Delete")}
          </button>
        )}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location?.coordinates?.latitude},${location?.coordinates?.longitude}`}
          type="button"
          className="px-2 md:px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm md:hover:bg-gray-50"
        >
          <MdOutlineDirections className="text-xl mr-1" />
          {t("directions", "Directions")}
        </a>
      </div>
    </div>
  );
};

export default PollutedLocationHeader;
