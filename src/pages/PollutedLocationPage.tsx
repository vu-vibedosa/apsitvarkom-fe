import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import PollutedLocation from "../types/PollutedLocation";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import NavBar from "../components/navBar/NavBar";
import { MdErrorOutline, MdOutlineChangeCircle } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PollutedLocationEditor from "../components/pollutedLocationPage/PollutedLocationEditor";
import CleaningEventsEditor from "../components/cleaningEventsEditor/CleaningEventsEditor";

const PollutedLocationPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [request, setRequest] = useState<ApiRequest<PollutedLocation>>({
    status: "loading",
  });

  useEffect(() => {
    if (!id) return;

    getPollutedLocation(id)
      .then((response) =>
        setRequest({
          status: "success",
          data: mapToPollutedLocation(response.data),
        })
      )
      .catch(() => {
        setRequest({ status: "error" });
      });
  }, [id]);

  const content = () => {
    switch (request.status) {
      case "success":
        return (
          <>
            <PollutedLocationEditor
              pollutedLocation={request.data}
              updatePage={(updatedPollutedLocation) =>
                setRequest({
                  status: "success",
                  data: updatedPollutedLocation,
                })
              }
            />
            <CleaningEventsEditor
              events={request.data.events}
              pollutedLocationId={request.data.id || ""}
              progress={request.data.progress || 0}
              setNewProgress={(newProgress) =>
                setRequest((prevState) => {
                  if (prevState.status !== "success") return prevState;

                  return {
                    ...prevState,
                    data: {
                      ...prevState.data,
                      progress: newProgress,
                    },
                  };
                })
              }
            />
          </>
        );
      case "loading":
        return (
          <div className="flex justify-center items-center my-4">
            <div className="flex flex-col items-center text-slate-600 text-sm">
              <div className="text-2xl animate-spin">
                <MdOutlineChangeCircle className="transform -scale-x-100" />
              </div>
              <div>{t("pleaseWait", "Please wait")}</div>
            </div>
          </div>
        );
      case "error":
      default:
        return (
          <div className="flex flex-col justify-between my-4">
            <div className="grow flex flex-col justify-center items-center text-slate-600 text-sm">
              <div className="text-xl">
                <MdErrorOutline />
              </div>
              <div>{t("error", "Error")}</div>
              <div>
                {t(
                  "pollutedLocationLoadSingleError",
                  "Failed to load the polluted location"
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-2">{content()}</div>
    </>
  );
};

export default PollutedLocationPage;
