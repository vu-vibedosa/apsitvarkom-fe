import { useEffect, useState } from "react";

export type Coordinates = Partial<{
  longitude: number;
  latitude: number;
}>;

const options = {
  enableHighAccuracy: false,
  timeout: 1000 * 60 * 1, // 1 min
  maximumAge: 1000 * 3600 * 1, // 1 hour
};

export const useCurrentLocation = () => {
  // store location in state
  const [location, setLocation] = useState<Coordinates>();

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (pos: {
    coords: { latitude: number; longitude: number };
  }) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we return undefined.
    if (!geolocation) {
      return undefined;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, undefined, options);
  }, [options]);

  return location;
};
