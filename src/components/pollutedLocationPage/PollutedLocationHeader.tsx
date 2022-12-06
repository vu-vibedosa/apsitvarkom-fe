import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import supportedLanguages from "../../languages";
import PollutedLocation from "../../types/PollutedLocation";
import {
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineDirections,
} from "react-icons/md";
import { deletePollutedLocation } from "../../backEndClient";
import { useNavigate } from "react-router-dom";

const PollutedLocationHeader: React.FC<PollutedLocation> = ({
  id,
  location,
  spotted,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguage =
    supportedLanguages.find((x) => x === i18next.language) ||
    supportedLanguages[0];

  return (
    <Layout
      title={
        <h1 className="text-xl md:text-2xl font-semibold md:font-bold">
          {location?.title?.[currentLanguage] ||
            t("titleMissing", "Title is missing")}
        </h1>
      }
      subtitle={
        <div className="text-sm text-gray-400">
          {spotted?.toLocaleString(i18next.language)}
        </div>
      }
      buttons={
        <>
          <button
            type="button"
            className="px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm md:hover:bg-gray-50"
          >
            <MdOutlineEdit className="text-xl mr-1" />
            {t("edit", "Edit")}
          </button>
          <button
            type="button"
            className="px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-red-300 bg-white text-red-700 shadow-sm md:hover:bg-red-50"
            onClick={async () => {
              if (!id) return;

              await deletePollutedLocation(id);
              navigate("/");
            }}
          >
            <MdOutlineDeleteForever className="text-xl mr-1" />
            {t("delete", "Delete")}
          </button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location?.coordinates?.latitude},${location?.coordinates?.longitude}`}
            type="button"
            className="px-4 py-2 flex text-sm md:text-base items-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm md:hover:bg-gray-50"
          >
            <MdOutlineDirections className="text-xl mr-1" />
            {t("directions", "Directions")}
          </a>
        </>
      }
    />
  );
};

export const PollutedLocationHeaderLoading: React.FC = () => {
  return (
    <Layout
      title={<div className="w-full h-8 bg-slate-200 rounded animate-pulse" />}
      subtitle={<div className="w-48 h-5 bg-slate-200 rounded animate-pulse" />}
      buttons={
        <>
          <div className="w-24 h-10 bg-slate-200 rounded animate-pulse" />
          <div className="w-24 h-10 bg-slate-200 rounded animate-pulse" />
          <div className="w-32 h-10 bg-slate-200 rounded animate-pulse" />
        </>
      }
    />
  );
};

const Layout: React.FC<{
  title: React.ReactNode;
  subtitle: React.ReactNode;
  buttons: React.ReactNode;
}> = ({ title, subtitle, buttons }) => {
  return (
    <div className="my-4 md:my-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 md:items-center justify-between">
      <div className="flex flex-col w-full space-y-1">
        {title}
        {subtitle}
      </div>
      <div className="flex flex-wrap md:flex-nowrap space-x-4 md:my-auto">
        {buttons}
      </div>
    </div>
  );
};

export default PollutedLocationHeader;
