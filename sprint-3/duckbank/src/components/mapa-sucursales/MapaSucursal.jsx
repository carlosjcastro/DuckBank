import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/assets/pages/sucursales/ubicacion.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

const MapaSucursales = ({ center, zoom, selectedProvince }) => (
  <MapContainer
    center={center}
    zoom={zoom}
    style={{ height: "100%", width: "100%" }}
    className="rounded-2xl"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {selectedProvince && (
      <>
        <Marker position={center} icon={customIcon}>
          <Popup>Sucursal de DuckBank en {selectedProvince}.</Popup>
        </Marker>
        <ChangeView center={center} zoom={zoom} />
      </>
    )}
  </MapContainer>
);

export default MapaSucursales;
