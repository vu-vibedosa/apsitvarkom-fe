import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/Layout";
import {
  getAllPollutedLocations,
  getAllPollutedLocationsOrdered,
} from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationResponse";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map, { vilniusCoordinates } from "./components/map/Map";
import SideBar from "./components/sideBar/SideBar";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { AxiosError } from "axios";

const App: React.FC = () => {
  const currentLocation = useCurrentLocation();
  const googleMapRef = useRef<google.maps.Map | null>(null);

  const [mapCenter, setMapCenter] =
    useState<google.maps.LatLngLiteral>(vilniusCoordinates);

  const [showCenterMarker, setShowCenterMarker] = useState<boolean>(false);

  const [pollutedLocations, setPollutedLocations] = useState<
    ApiRequest<PollutedLocation[]>
  >({ status: "loading" });

  useEffect(() => {
    const controller = !currentLocation ? new AbortController() : undefined;

    const axiosRequest = !currentLocation
      ? getAllPollutedLocations(controller && { signal: controller.signal })
      : getAllPollutedLocationsOrdered(currentLocation);

    axiosRequest
      .then((response) =>
        setPollutedLocations({
          status: "success",
          data: response.data.map((locationResponse) =>
            mapToPollutedLocation(locationResponse)
          ),
        })
      )
      .catch((e) => {
        if (e instanceof AxiosError && e.code === "ERR_CANCELED") {
          // Do not change the state if the request was cancelled (by us)
          return;
        }

        setPollutedLocations({ status: "error" });
      });

    return () => {
      controller?.abort();
    };
  }, [currentLocation]);

  return (
    <Layout>
      <Map
        locationsRequest={pollutedLocations}
        mapRef={googleMapRef}
        center={mapCenter}
        setCenter={(newCenter) => setMapCenter(newCenter)}
        showCenterMarker={showCenterMarker}
      />
      <SideBar
        locationsRequest={pollutedLocations}
        googleMap={googleMapRef}
        coordinates={mapCenter}
        setShowCenterMarker={(newValue) => setShowCenterMarker(newValue)}
        addCreatedPollutedLocation={(newLocation) => {
          setPollutedLocations((prevState) => {
            if (prevState.status !== "success") return prevState;

            return {
              ...prevState,
              data: [...prevState.data, newLocation],
            };
          });
        }}
      />
    </Layout>
  );
};

export default App;
