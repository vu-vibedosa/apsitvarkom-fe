import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/Layout";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationResponse";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map, { vilniusCoordinates } from "./components/map/Map";
import SideBar from "./components/sideBar/SideBar";

const App: React.FC = () => {
  const googleMapRef = useRef<google.maps.Map | null>(null);

  const [mapCenter, setMapCenter] =
    useState<google.maps.LatLngLiteral>(vilniusCoordinates);

  const [showCenterMarker, setShowCenterMarker] = useState<boolean>(false);

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
        showCenterMarker={showCenterMarker}
      />
      <SideBar
        locationsRequest={pollutedLocations}
        googleMap={googleMapRef}
        coordinates={mapCenter}
        setShowCenterMarker={(newValue) => setShowCenterMarker(newValue)}
      />
    </Layout>
  );
};

export default App;
