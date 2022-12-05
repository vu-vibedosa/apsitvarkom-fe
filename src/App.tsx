import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import {
  getAllPollutedLocations,
  getAllPollutedLocationsOrdered,
} from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationResponse";
import PollutedLocation, { Coordinates } from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map, {
  coordinatesToGoogle,
  vilniusCoordinates,
} from "./components/map/Map";
import SideBar from "./components/sideBar/SideBar";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { AxiosError } from "axios";

const App: React.FC = () => {
  const currentLocation = useCurrentLocation();
  const [googleMap, setGoogleMap] = useState<google.maps.Map | undefined>(
    undefined
  );

  const [mapCenter, setMapCenter] = useState<Coordinates>(vilniusCoordinates);

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

  useEffect(() => {
    if (!currentLocation) return;
    if (!googleMap) return;
    googleMap.panTo(coordinatesToGoogle(currentLocation));
  }, [currentLocation, googleMap]);

  return (
    <Layout>
      <Map
        locationsRequest={pollutedLocations}
        map={googleMap}
        setMap={(newMap) => setGoogleMap(newMap)}
        center={mapCenter}
        setCenter={(newCenter) => setMapCenter(newCenter)}
        showCenterMarker={showCenterMarker}
        currentLocation={currentLocation}
      />
      <SideBar
        listProps={{
          locationsRequest: pollutedLocations,
          googleMap: googleMap,
        }}
        formProps={{
          coordinates: mapCenter,
          setShowCenterMarker: (newValue) => setShowCenterMarker(newValue),
          addCreatedPollutedLocation: (newLocation) => {
            setPollutedLocations((prevState) => {
              if (prevState.status !== "success") return prevState;

              return {
                ...prevState,
                data: [...prevState.data, newLocation],
              };
            });
          },
        }}
      />
    </Layout>
  );
};

export default App;
