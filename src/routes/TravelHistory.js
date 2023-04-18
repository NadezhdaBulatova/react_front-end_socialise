import React from "react";
import MainBg from "../components/MainBg";
import ProfileCardBig from "../components/ProfileCardBig";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const TravelHistory = () => {
  const position = [51.505, -0.09];
  return (
    <MainBg>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </MainBg>
  );
};

export default TravelHistory;
