import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/Layout";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationResponse";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map from "./components/map/Map";
import SideBar, { sideBarModes } from "./components/sideBar/SideBar";

const App: React.FC = () => {
  const googleMapRef = useRef<google.maps.Map | null>(null);

  const vilniusCoordinates: google.maps.LatLngLiteral = {
    lat: 54.6872,
    lng: 25.2797,
  };
  const [mapCenter, setMapCenter] =
    useState<google.maps.LatLngLiteral>(vilniusCoordinates);

  const [sideBarMode, setSideBarMode] =
    useState<typeof sideBarModes[number]>("list");

  const [pollutedLocations, setPollutedLocations] = useState<
    ApiRequest<PollutedLocation[]>
  >({ status: "loading" });

  useEffect(() => {
    getAllPollutedLocations()
      .then((response) =>
        setPollutedLocations({
          status: "success",
          data: response.data.map((locationResponse) =>
            mapToPollutedLocation(locationResponse)
          ),
        })
      )
      .catch((e) => {
        console.error(e);
        setPollutedLocations({ status: "error" });
      });
  }, []);

  return (
    <Layout>
      <Map
        locationsRequest={pollutedLocations}
        mapRef={googleMapRef}
        center={mapCenter}
        setCenter={(newCenter) => setMapCenter(newCenter)}
        showCenterMarker={sideBarMode === "form"}
      />
      <SideBar
        locationsRequest={pollutedLocations}
        googleMap={googleMapRef}
        coordinates={mapCenter}
        currentMode={sideBarMode}
        setCurrentMode={(newSideBarMode) => setSideBarMode(newSideBarMode)}
      />
    </Layout>
  );
};

export default App;
