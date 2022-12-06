import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center text-lg font-semibold">
        <MdErrorOutline className="h-6 w-auto" />
        <div>
          {t(
            "notFoundMessage",
            "The page you are looking for could not be found"
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
