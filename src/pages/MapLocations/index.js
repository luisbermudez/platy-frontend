import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const locationsMap = useRef(null);
  const geocoder = useRef(null);

  const [lng, setLng] = useState(-95.7928);
  const [lat, setLat] = useState(34.0264);
  const [zoom, setZoom] = useState(3.22);

  useEffect(() => {
    if (locationsMap.current) return;
    locationsMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
    });

    locationsMap.current.addControl(geocoder.current);
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
