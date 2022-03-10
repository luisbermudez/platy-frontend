import React, { useRef, useEffect, useState } from "react";
import { videolocationCreateWs } from "../../services/videolocation-ws";
import './mapAddLocation.css'
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const mapAddLocation = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (mapAddLocation.current) return;
    mapAddLocation.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    mapAddLocation.current.on("style.load", () => {
      mapAddLocation.current.on("click", (e) => {
        const longitude = e.lngLat.lng.toFixed(3);
        const latitude = e.lngLat.lat.toFixed(3);
        const coordinates = e.lngLat;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<h3>You clicked here!</h3><p>Lat: ${latitude} | Lng: ${longitude}</p>`
          )
          .addTo(mapAddLocation.current);
      });
    });
  });

  useEffect(() => {
    if (!mapAddLocation.current) return;
    mapAddLocation.current.on("move", () => {
      setLng(mapAddLocation.current.getCenter().lng.toFixed(4));
      setLat(mapAddLocation.current.getCenter().lat.toFixed(4));
      setZoom(mapAddLocation.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="addlocationmap-container" />
    </div>
  );
}

function MapAddLocation() {

  const handleCall = async () => {
    try {
      const res = await videolocationCreateWs();
      console.log(res);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Add A New Location</h1>
      <Map />
      <button onClick={handleCall}>Call server</button>
    </>
  );
}

export default MapAddLocation;
