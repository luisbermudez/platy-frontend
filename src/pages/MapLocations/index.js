import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useSelector, useDispatch } from "react-redux";
import { videolocationsCall } from "../../redux/videolocationSlice";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const setMarkers = useRef(false);

  const mapContainer = useRef(null);
  const locationsMap = useRef(null);
  const geocoder = useRef(null);
  const navControl = useRef(null);

  const [lng, setLng] = useState(-95.7928);
  const [lat, setLat] = useState(34.0264);
  const [zoom, setZoom] = useState(3.22);
  const [pitch, setPitch] = useState(0);

  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationsCall());
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    if (locationsMap.current) return;
    locationsMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      pitch: [pitch],
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

    locationsMap.current.addControl(geocoder.current, "top-left");
    locationsMap.current.addControl(navControl.current, "bottom-right");
    locationsMap.current.addControl(new mapboxgl.FullscreenControl());
  });

  // useEffect(() => {
  //   if (!locationsMap.current) return;
  //   locationsMap.current.on("move", () => {
  //     setLng(locationsMap.current.getCenter().lng.toFixed(4));
  //     setLat(locationsMap.current.getCenter().lat.toFixed(4));
  //     setZoom(locationsMap.current.getZoom().toFixed(2));
  //     setPitch(locationsMap.current.getPitch());
  //   });
  // });

  useEffect(() => {
    let timeoutId;
    if (!setMarkers.current) {
      timeoutId = setTimeout(() => {
        videolocations.forEach((spot) => {
          new mapboxgl.Marker({
            color: "#ec127f",
          })
            .setLngLat([
              spot.location.coordinates.longitude,
              spot.location.coordinates.latitude,
            ])
            .addTo(locationsMap.current);
        });
        setMarkers.current = true;
      }, 8e2);
    }

    return () => {
      clearTimeout(timeoutId);
    };
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
      <Map mapName={"locations"} />
    </>
  );
}

export default MapLocations;
