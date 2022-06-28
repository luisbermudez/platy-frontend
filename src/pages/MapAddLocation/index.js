import React, { useRef, useEffect, useState } from "react";
import "./mapAddLocation.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useSelector } from "react-redux";
import { setCoordinates } from "../../redux/videolocationSlice";
import { useDispatch } from "react-redux";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapAddLocation() {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.videolocation.coordinates);

  const mapContainer = useRef(null);
  const mapAddLocation = useRef(null);
  const geocoder = useRef(null);
  const geolocate = useRef(null);
  const navControl = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (mapAddLocation.current) return;
    mapAddLocation.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: coordinates
        ? [coordinates.lng, coordinates.lat]
        : [-80.9091, 26.3473],
      zoom: 1,
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

    geolocate.current = new mapboxgl.GeolocateControl({
      positionOptions: { enableAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapAddLocation.current.addControl(geocoder.current, "top-left");
    mapAddLocation.current.addControl(navControl.current, "bottom-right");
    mapAddLocation.current.addControl(new mapboxgl.FullscreenControl());
    mapAddLocation.current.addControl(geolocate.current, "bottom-right");

    mapAddLocation.current.on("style.load", () => {
      mapAddLocation.current.on("click", (e) => {
        const longitude = e.lngLat.lng.toFixed(4);
        const latitude = e.lngLat.lat.toFixed(4);
        const onClickCoordinates = e.lngLat;
        marker.current
          .setLngLat(onClickCoordinates)
          .addTo(mapAddLocation.current);
        dispatch(
          setCoordinates({
            lng: longitude,
            lat: latitude,
          })
        );
      });
    });
  });

  // Marker icon changes when there's new coordinates
  useEffect(() => {
    if (coordinates) {
      const longitude = Number(coordinates.lng);
      const latitude = Number(coordinates.lat);
      marker.current
        .setLngLat([longitude, latitude])
        .addTo(mapAddLocation.current);
    }
  }, [coordinates]);

  return (
    <div className="MapAddLocation">
      <div ref={mapContainer} />
    </div>
  );
}

export default MapAddLocation;
