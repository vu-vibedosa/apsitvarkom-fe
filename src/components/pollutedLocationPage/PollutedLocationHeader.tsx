import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import supportedLanguages from "../../languages";
import PollutedLocation from "../../types/PollutedLocation";

const PollutedLocationHeader: React.FC<PollutedLocation> = ({ location }) => {
  const { t } = useTranslation();
  const currentLanguage =
    supportedLanguages.find((x) => x === i18next.language) ||
    supportedLanguages[0];

  return (
    <div>
      <h1 className="text-xl">
        {location?.title?.[currentLanguage] ||
          t("titleMissing", "Title is missing")}
      </h1>
    </div>
  );
};

export default PollutedLocationHeader;
