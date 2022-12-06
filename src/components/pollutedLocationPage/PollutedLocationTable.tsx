import React from "react";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltip";
import { MdInfoOutline } from "react-icons/md";

interface Props {
  radius: React.ReactNode;
  severity: React.ReactNode;
  progress: React.ReactNode;
  notes?: React.ReactNode;
}

const PollutedLocationTable: React.FC<Props> = ({
  radius,
  severity,
  progress,
  notes,
}) => {
  const { t } = useTranslation();

  return (
    <div className="shadow md:rounded-lg">
      <dl>
        <div className="bg-gray-50 px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
          <dt className="font-medium">
            {t("radius", "Radius") + " (" + t("meters", "meters") + ")"}
          </dt>
          <dd className="text-gray-900 md:col-span-2">{radius}</dd>
        </div>
        <div className="bg-white px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
          <dt className="font-medium">{t("severity", "Severity")}</dt>
          <dd className="text-gray-900 md:col-span-2">{severity}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
          <dt className="font-medium">{t("progress", "Progress")}</dt>
          <dd className="text-gray-900 md:col-span-2">{progress}</dd>
        </div>
        {notes && (
          <div className="bg-white px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:px-6">
            <dt className="font-medium flex items-center space-x-1">
              <div>{t("notes", "Notes")}</div>
              <Tooltip
                text={t(
                  "notesInfo",
                  "This value was entered by a user, so it might be in a different language"
                )}
              >
                <MdInfoOutline />
              </Tooltip>
            </dt>
            <dd className="text-gray-900 md:col-span-2">{notes}</dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default PollutedLocationTable;
