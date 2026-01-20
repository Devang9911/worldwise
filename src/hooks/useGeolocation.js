import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setPosition(null);

        if (error.code === 1) {
          setError("Permission denied. Please allow location access.");
        } else if (error.code === 2) {
          setError("Location unavailable.");
        } else if (error.code === 3) {
          setError("Location request timed out.");
        } else {
          setError(error.message);
        }

        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  return { getPosition, error, loading, position };
}
