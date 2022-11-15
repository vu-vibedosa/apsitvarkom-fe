import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

interface Props {
  markers: {
    coordinates: google.maps.LatLngLiteral;
    id: string;
  }[];
}

const Map: React.FC<Props> = ({ markers }) => {
  const vilniusCoordinates: google.maps.LatLngLiteral = {
    lat: 54.6872,
    lng: 25.2797,
  };

  const lithuaniaBounds = {
    north: 56.3725283881,
    south: 53.9057022162,
    west: 21.0558004086,
    east: 26.5882792498,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const renderMap = () => (
    <GoogleMap
      mapContainerClassName="w-full h-1/2 md:h-full flex-none md:flex-1"
      options={{
        disableDefaultUI: true,
        clickableIcons: false,
        center: vilniusCoordinates,
        zoom: 13,
        maxZoom: 18,
        restriction: {
          latLngBounds: lithuaniaBounds,
        },
      }}
    >
      {markers.map((marker) => (
        <MarkerF position={marker.coordinates} key={marker.id} />
      ))}
    </GoogleMap>
  );

  if (loadError) return <p>Failed to load map</p>;

  return isLoaded ? renderMap() : <p>Loading</p>;
};

export default Map;
