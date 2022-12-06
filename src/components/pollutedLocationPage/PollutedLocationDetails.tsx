import React from "react";
import { useTranslation } from "react-i18next";
import PollutedLocation, {
  severityLevels,
  severityLevelsLocalized,
} from "../../types/PollutedLocation";

const PollutedLocationDetails: React.FC<PollutedLocation> = ({
  radius,
  severity,
  progress,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <div className="shadow md:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
            <dt className="text-md font-medium text-gray-500">
              {t("radius", "Radius") + " (" + t("meters", "meters") + ")"}
            </dt>
            <dd className="mt-1 text-md text-gray-900 md:col-span-2 md:mt-0">
              {radius}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
            <dt className="text-md font-medium text-gray-500">
              {t("severity", "Severity")}
            </dt>
            <dd className="mt-1 text-md text-gray-900 md:col-span-2 md:mt-0">
              {severityLevelsLocalized(t)[severity || severityLevels[0]]}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
            <dt className="text-md font-medium text-gray-500">
              {t("progress", "Progress")}
            </dt>
            <dd className="mt-1 text-md text-gray-900 md:col-span-2 md:mt-0">
              {progress}
            </dd>
          </div>
          {notes && (
            <div className="bg-gray-50 px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
              <dt className="text-md font-medium text-gray-500">
                {t("notes", "Notes")}
              </dt>
              <dd className="mt-1 text-md text-gray-900 md:col-span-2 md:mt-0">
                {notes}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default PollutedLocationDetails;
