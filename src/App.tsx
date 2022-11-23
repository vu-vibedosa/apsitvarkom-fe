import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/Layout";
import { getAllPollutedLocations } from "./backEndClient";
import { mapToPollutedLocation } from "./types/backEnd/PollutedLocationResponse";
import PollutedLocation from "./types/PollutedLocation";
import { ApiRequest } from "./types/backEnd/ApiRequest";
import Map from "./components/map/Map";
import SidebarWrapper from "./components/sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  const googleMapRef = useRef<google.maps.Map | null>(null);

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
      <Map locationsRequest={pollutedLocations} mapRef={googleMapRef} />
      <BrowserRouter>
        <SidebarWrapper
          locationsRequest={pollutedLocations}
          googleMap={googleMapRef.current}
        />
      </BrowserRouter>
    </Layout>
  );
};

export default App;
