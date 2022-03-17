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
  const navControl = useRef(null);
  const marker = useRef(null);

  const [lng, setLng] = useState(-73.9615);
  const [lat, setLat] = useState(40.7801);
  const [zoom, setZoom] = useState(12.15);
  const [bearing, setBearing] = useState(0);
  // const [pitch, setPitch] = useState(62);
  const [lngPop, setLngPop] = useState(null);
  const [latPop, setLatPop] = useState(null);

  useEffect(() => {
    if (mapAddLocation.current) return;
    mapAddLocation.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      around: [lng, lat],
      // pitch: [pitch],
      bearing: [bearing],
      zoom: zoom,
    });

    navControl.current = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
    });

    marker.current = new mapboxgl.Marker({
      color: "#ec127f",
    });

    mapAddLocation.current.addControl(geocoder.current, "top-left");
    mapAddLocation.current.addControl(navControl.current, "bottom-right");
    mapAddLocation.current.addControl(new mapboxgl.FullscreenControl());

    mapAddLocation.current.on("style.load", () => {
      mapAddLocation.current.on("click", (e) => {
        const longitude = e.lngLat.lng.toFixed(4);
        const latitude = e.lngLat.lat.toFixed(4);
        const coordinates = e.lngLat;
        marker.current.setLngLat(coordinates).addTo(mapAddLocation.current);
        setLngPop(longitude);
        setLatPop(latitude);
      });
    });
  });

  useEffect(() => {
    if (!mapAddLocation.current) return;
    mapAddLocation.current.on("move", () => {
      setLng(mapAddLocation.current.getCenter().lng.toFixed(4));
      setLat(mapAddLocation.current.getCenter().lat.toFixed(4));
      setZoom(mapAddLocation.current.getZoom().toFixed(2));
      setBearing(mapAddLocation.current.getBearing());
      // setPitch(mapAddLocation.current.getPitch());
      // setLngPop(lng);
      // setLatPop(lat);
    });

    // marker.current = new mapboxgl.Marker();

    // mapAddLocation.current.on("style.load", () => {
    //   mapAddLocation.current.on("click", (e) => {
    //     const longitude = e.lngLat.lng.toFixed(4);
    //     const latitude = e.lngLat.lat.toFixed(4);
    //     const coordinates = e.lngLat;
    //     // new mapboxgl.Popup()
    //     //   .setLngLat(coordinates)
    //     //   .setHTML(`<h3>New location 😎</h3>`)
    //     //   .addTo(mapAddLocation.current);
    //     marker.current.setLngLat(coordinates).addTo(mapAddLocation.current);
    //     setLngPop(longitude);
    //     setLatPop(latitude);
    //   });
    // });
  });

  return (
    <div>
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
