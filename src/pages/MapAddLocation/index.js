import React, { useRef, useEffect, useState } from "react";
import "./mapAddLocation.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import AddLocationForm from "../../components/AddLocationForm";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapAddLocation() {
  const mapContainer = useRef(null);
  const mapAddLocation = useRef(null);
  const geocoder = useRef(null);

  const [lng, setLng] = useState(-73.9615);
  const [lat, setLat] = useState(40.7801);
  const [zoom, setZoom] = useState(12.15);
  const [lngPop, setLngPop] = useState(null);
  const [latPop, setLatPop] = useState(null);

  useEffect(() => {
    if (mapAddLocation.current) return;
    mapAddLocation.current = new mapboxgl.Map({
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

    mapAddLocation.current.addControl(geocoder.current);
  });

  useEffect(() => {
    if (!mapAddLocation.current) return;
    mapAddLocation.current.on("move", () => {
      setLng(mapAddLocation.current.getCenter().lng.toFixed(4));
      setLat(mapAddLocation.current.getCenter().lat.toFixed(4));
      setZoom(mapAddLocation.current.getZoom().toFixed(2));
      // setLngPop(lng);
      // setLatPop(lat);
    });

    mapAddLocation.current.on("style.load", () => {
      mapAddLocation.current.on("click", (e) => {
        const longitude = e.lngLat.lng.toFixed(4);
        const latitude = e.lngLat.lat.toFixed(4);
        const coordinates = e.lngLat;
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>New location 😎</h3>`)
          .addTo(mapAddLocation.current);
        setLngPop(longitude);
        setLatPop(latitude);
      });
    });
  });

  return (
    <div>
      <h1>Add A New Location</h1>
      <div ref={mapContainer} className="addlocationmap-container" />
      <p>
        Use the map to locate the spot you want to add and click on it, a popup
        will appear.
      </p>
      <AddLocationForm coordinateLng={lngPop} coordinateLat={latPop} />
    </div>
  );
}

export default MapAddLocation;
