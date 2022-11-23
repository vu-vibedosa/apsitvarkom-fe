import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useMemo, useState } from "react";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation from "../../types/PollutedLocation";

interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
}

const Map: React.FC<Props> = ({ locationsRequest, mapRef }) => {
  const markers = useMemo(
    () =>
      locationsRequest.status === "success"
        ? locationsRequest.data
            .filter(
              (pollutedLocation) =>
                pollutedLocation.location?.coordinates?.latitude &&
                pollutedLocation.location?.coordinates?.longitude
            )
            .map((pollutedLocation) => ({
              coordinates: {
                lat: pollutedLocation?.location?.coordinates?.latitude || 0,
                lng: pollutedLocation?.location?.coordinates?.longitude || 0,
              },
              id: pollutedLocation.id || "",
            }))
        : undefined,
    [locationsRequest]
  );

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
