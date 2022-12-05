import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ApiRequest } from "../../types/backEnd/ApiRequest";
import PollutedLocation, { Coordinates } from "../../types/PollutedLocation";
import locationPin from "../../assets/location-pin.svg";
import creationPin from "../../assets/creation-pin.svg";
import personPin from "../../assets/person-pin.svg";

interface Props {
  locationsRequest: ApiRequest<PollutedLocation[]>;
  map: google.maps.Map | undefined;
  setMap: (newMap: google.maps.Map | undefined) => void;
  center: Coordinates;
  setCenter: (newCenter: Coordinates) => void;
  showCenterMarker: boolean;
  currentLocation?: Coordinates;
}

export const vilniusCoordinates: Coordinates = {
  latitude: 54.6872,
  longitude: 25.2797,
};

export const coordinatesToGoogle: (
  coordinates: Coordinates
) => google.maps.LatLngLiteral = (coordinates) => ({
  lat: coordinates.latitude || 0,
  lng: coordinates.longitude || 0,
});

const Map: React.FC<Props> = ({
  locationsRequest,
  map,
  setMap,
  setCenter,
  center,
  showCenterMarker,
  currentLocation,
}) => {
  const centerMarkerRef = useRef<google.maps.Marker | null>(null);
  const [zoom, setZoom] = useState<number>(13);

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

  const lithuaniaBounds = {
    north: 56.3725283881,
    south: 53.9057022162,
    west: 21.0558004086,
    east: 26.5882792498,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const handleOnLoad = useCallback((map: google.maps.Map) => {
    console.log("map loaded");
    setMap(map);
  }, []);

  const handleOnUnmount = useCallback(() => {
    console.log("map unloaded");

    setMap(undefined);
  }, []);

  const handleCenterChanged = useCallback(() => {
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        setCenter({
          latitude: newCenter.lat(),
          longitude: newCenter.lng(),
        });
        centerMarkerRef?.current?.setPosition(newCenter);
      }
    }
  }, [map]);

  const handleZoomChanged = useCallback(() => {
    if (map) {
      const newZoom = map.getZoom();
      if (newZoom) {
        setZoom(newZoom);
      }
    }
  }, [map]);

  const renderedMap = useMemo(
    () => (
      <GoogleMap
        mapContainerClassName="w-full h-1/3 md:h-full flex-none md:flex-1"
        onLoad={handleOnLoad}
        onUnmount={handleOnUnmount}
        onCenterChanged={() => handleCenterChanged()}
        onZoomChanged={() => handleZoomChanged()}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          zoom: zoom,
          maxZoom: 18,
          center: coordinatesToGoogle(center),
          restriction: {
            latLngBounds: lithuaniaBounds,
          },
        }}
      >
        {markers?.map((marker) => (
          <MarkerF
            position={marker.coordinates}
            key={marker.id}
            icon={{
              url: locationPin,
            }}
          />
        ))}
        {showCenterMarker && (
          <MarkerF
            position={coordinatesToGoogle(center)}
            onLoad={(marker) => (centerMarkerRef.current = marker)}
            onUnmount={() => (centerMarkerRef.current = null)}
            icon={{
              url: creationPin,
            }}
          />
        )}
        {currentLocation && (
          <MarkerF
            position={coordinatesToGoogle(currentLocation)}
            icon={{
              url: personPin,
            }}
          />
        )}
      </GoogleMap>
    ),
    [markers, showCenterMarker, currentLocation, map]
  );

  if (loadError) return <p>Failed to load map</p>;

  return isLoaded ? (
    renderedMap
  ) : (
    <div className="w-full h-full bg-slate-200" />
  );
};

export default Map;
