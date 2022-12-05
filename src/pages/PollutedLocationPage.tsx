import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPollutedLocation } from "../backEndClient";
import { ApiRequest } from "../types/backEnd/ApiRequest";
import PollutedLocation from "../types/PollutedLocation";
import { mapToPollutedLocation } from "../types/backEnd/PollutedLocationResponse";
import NavBar from "../components/navBar/NavBar";

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
      <div className="container mx-auto">
        {request?.status === "success" && (
          <div>{`Hello ${request.data.location?.title?.en} ${request.data.location?.coordinates?.latitude}, ${request.data.location?.coordinates?.longitude}`}</div>
        )}
      </div>
    </>
  );
};

export default PollutedLocationPage;
