import { useEffect, useState } from "react";
import { Coordinates } from "../types/PollutedLocation";

const options = {
  enableHighAccuracy: false,
  timeout: 1000 * 60 * 1, // 1 min
  maximumAge: 1000 * 3600 * 1, // 1 hour
};

const useCurrentLocation = () => {
  // store location in state
  const [location, setLocation] = useState<Coordinates>();

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (pos: { coords: Coordinates }) => {
    setLocation(pos.coords);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined in the used browser we return undefined.
    if (!geolocation) {
      return undefined;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(
      handleSuccess,
      () => {
        setLocation(undefined);
      },
      options
    );
  }, [options]);

  return location;
};

export default useCurrentLocation;
