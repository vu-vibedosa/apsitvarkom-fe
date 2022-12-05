import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center text-lg font-semibold">
        <MdErrorOutline className="h-6 w-auto" />
        <h1>{t("errorPageMessage", "Ran into a problem!")}</h1>
        {isRouteErrorResponse(error) && <h2>{error.status}</h2>}
      </div>
    </div>
  );
};

export default ErrorPage;
