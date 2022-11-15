import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useMemo, useRef, useState } from "react";

interface Props {
  markers?: {
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(vilniusCoordinates);

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleOnUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleCenterChanged = useCallback(() => {
    if (mapRef !== null && mapRef.current !== null) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        setCenter({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  }, [mapRef]);

  const renderedMap = useMemo(
    () => (
      <GoogleMap
        mapContainerClassName="w-full h-1/2 md:h-full flex-none md:flex-1"
        onLoad={handleOnLoad}
        onUnmount={handleOnUnmount}
        onCenterChanged={() => {
          if (mapRef.current !== null) {
            handleCenterChanged();
          }
        }}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          zoom: 13,
          maxZoom: 18,
          center: center,
          restriction: {
            latLngBounds: lithuaniaBounds,
          },
        }}
      >
        {markers?.map((marker) => (
          <MarkerF position={marker.coordinates} key={marker.id} />
        ))}
      </GoogleMap>
    ),
    [markers]
  );

  if (loadError) return <p>Failed to load map</p>;

  return isLoaded ? (
    renderedMap
  ) : (
    <div className="w-full h-full bg-slate-200" />
  );
};

export default Map;
