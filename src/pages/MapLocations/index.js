import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const locationsMap = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (locationsMap.current) return;
    locationsMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!locationsMap.current) return;
    locationsMap.current.on("move", () => {
      setLng(locationsMap.current.getCenter().lng.toFixed(4));
      setLat(locationsMap.current.getCenter().lat.toFixed(4));
      setZoom(locationsMap.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="locationmap-container" />
    </div>
  );
}

function MapLocations() {
  return (
    <>
      <h1>Locations</h1>
      <Map mapName={"locations"} />
    </>
  );
}

export default MapLocations;
