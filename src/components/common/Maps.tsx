"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

interface MapComponentProps {
  coordinates: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinates }) => {
  const [L, setL] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    import("leaflet").then((leaflet) => setL(leaflet));
  }, []);

  // Quand coordinates changent, on recentre la carte
  useEffect(() => {
    if (map && coordinates) {
      map.setView(coordinates, map.getZoom());
    }
  }, [coordinates, map]);

  if (!L) return null;

  const locationIcon = L.divIcon({
    html: `<img src="/icons/icon-localisation.svg" alt="Location" style="width:45px;height:41px;" />`,
    className: "",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const defaultCenter: [number, number] = [48.856614, 2.3522219];
  const latitude = coordinates?.[0] || defaultCenter[0];
  const longitude = coordinates?.[1] || defaultCenter[1];

  const zoomIn = () => {
    if (map) map.setZoom(map.getZoom() + 1);
  };

  const zoomOut = () => {
    if (map) map.setZoom(map.getZoom() - 1);
  };

  return (
    <>
      <div className="relative h-[350px] w-full md:h-[650px] md:max-w-[879px] shadow-lg   border-2 border-dvianeutral-50 rounded-12px overflow-hidden">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          className="h-full w-full rounded-lg"
          ref={setMap}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Circle
            center={[latitude, longitude]}
            radius={1000}
            pathOptions={{
              color: "#D79B25",
              fillColor: "transparent",
              fillOpacity: 0.3
            }}
          />

          {/* Entourer Marker dans un svg Circle  */}
          <Marker position={[latitude, longitude]} icon={locationIcon}>
            <Popup>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-gray-800">
                  Tchimbamba, Pointe-Noire
                </span>
                <div className="flex items-center gap-2">
       
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Localisation vérifié
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        <div className="absolute bottom-7 right-4 flex flex-col rounded-12px overflow-hidden z-[2000]">
          <button
            onClick={zoomIn}
            className="border-b-2 border-b-dvianeutral-50 bg-dvianeutral-92 text-dvianeutral-10 px-3 py-2 shadow-lg hover:shadow-sm transition-shadow duration-300 font-bold text-lg rounded-t-12px cursor-pointer"
            aria-label="Zoom in"
          >
            +
          </button>

          <button
            onClick={zoomOut}
            className="bg-dvianeutral-92 text-dvianeutral-10 px-3 py-2 shadow-lg hover:shadow-sm transition-shadow duration-300 font-bold text-lg rounded-b-12px cursor-pointer"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        {/* Bouton (en haut à droite) */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-[2000] flex justify-center w-full px-4">
          <button
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
              window.open(url, "_blank");
            }}
            className="w-full max-w-[280px] md:max-w-[306px] bg-yellowkouzua hover:bg-yellowkouzua-dark text-white px-4 py-2 shadow-lg border border-transparent rounded-[12px] text-xs md:text-sm font-medium tracking-label-large hover:shadow-sm transition-shadow duration-300 cursor-pointer whitespace-nowrap"
          >
            Voir l&apos;itinéraire
          </button>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
