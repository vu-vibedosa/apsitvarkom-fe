import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import PollutedLocation from "../types/PollutedLocation";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import NavBar from "../components/navBar/NavBar";
import PollutedLocationHeader from "../components/pollutedLocationPage/PollutedLocationHeader";
import PollutedLocationDetails from "../components/pollutedLocationPage/PollutedLocationDetails";

const PollutedLocationPage: React.FC = () => {
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

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-2">
        {request?.status === "success" && (
          <>
            <PollutedLocationHeader {...request.data} />
            <PollutedLocationDetails {...request.data} />
          </>
        )}
      </div>
    </>
  );
};

export default PollutedLocationPage;
