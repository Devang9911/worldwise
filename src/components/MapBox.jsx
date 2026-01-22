import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useSelector } from "react-redux";

function MapBox() {
  const {city} = useSelector((state)=>state.city)
  const [mapPosition, setMapPosition] = useState([
    52.53586782505711, 13.376933665713324,
  ]);
  const {
    loading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat , mapLng] = useUrlPosition()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) setMapPosition([geolocationPosition.latitude, geolocationPosition.longitude]);
  }, [geolocationPosition]);

  return (
    <div className="w-1/2 h-screen p-8">
      <div className="mt-30 h-[80%] relative">
        <button
          className="bg-green-600 text-black cursor-pointer font-bold text-lg p-2 border border-black rounded-xl absolute bottom-3 right-3 z-11"
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading..." : "Use Your position"}
        </button>
        <MapContainer
          center={mapPosition}
          zoom={6}
          scrollWheelZoom
          className="h-full w-full rounded-xl z-10"
        >
          <TileLayer
            // attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {city.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup className="text-lg font-bold">
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default MapBox;
