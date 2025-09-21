import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { getColor, getRadius } from "../utils/magnitude";

export default function MapView({ earthquakes, loading, flyToCoords, setFlyToCoords }) {
  const mapRef = useRef(null);
  const [plates, setPlates] = useState(null);

  // Load tectonic plates overlay
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
    )
      .then((res) => res.json())
      .then((data) => setPlates(data))
      .catch((err) => console.error("Tectonic plates error:", err));
  }, []);

  // Fly to searched location
  useEffect(() => {
    if (flyToCoords && mapRef.current) {
      mapRef.current.flyTo([flyToCoords.lat, flyToCoords.lon], 6, {
        duration: 1.5,
      });
      setFlyToCoords(null);
    }
  }, [flyToCoords, setFlyToCoords]);

  return (
    <div className="relative h-full w-full">
      {/* Flat Minimalist Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <svg
            className="w-12 h-12 text-gray-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        whenCreated={(m) => (mapRef.current = m)}
        scrollWheelZoom
      >
        <LayersControl position="topright">
          {/* Base layers */}
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Streets">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Satellite">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>

          {/* Tectonic Plates overlay */}
          {plates && (
            <LayersControl.Overlay checked name="Tectonic Plates">
              <GeoJSON
                data={plates}
                style={() => ({ color: "orange", weight: 2 })}
              />
            </LayersControl.Overlay>
          )}
        </LayersControl>

        {/* Earthquake markers clustered */}
        <MarkerClusterGroup chunkedLoading>
          {earthquakes.map((eq) => {
            const coords = eq.geometry?.coordinates;
            if (!coords) return null;
            const [lon, lat, depth] = coords;
            const mag = eq.properties?.mag ?? 0;
            return (
              <CircleMarker
                key={eq.id}
                center={[lat, lon]}
                radius={getRadius(mag)}
                pathOptions={{
                  color: getColor(mag),
                  fillColor: getColor(mag),
                  fillOpacity: 0.7,
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="font-semibold">{eq.properties?.place}</div>
                    <div>Magnitude: {mag.toFixed(1)}</div>
                    <div>Depth: {depth} km</div>
                    <div>
                      {new Date(eq.properties?.time).toLocaleString()}
                    </div>
                    <a
                      href={eq.properties?.url}
                      className="text-xs text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      More info
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow p-3 text-sm">
        <div className="font-semibold mb-1">Magnitude</div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 inline-block"></span> 0–2
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-500 inline-block"></span> 2–4
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-orange-500 inline-block"></span> 4–6
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-600 inline-block"></span> 6+
        </div>
      </div>
    </div>
  );
}
