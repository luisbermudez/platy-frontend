import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useSelector, useDispatch } from "react-redux";
import {
  videolocationsCall,
  setCurrentPage,
} from "../../redux/videolocationSlice";
import "./MapLocations.css";
import ReactDOM from "react-dom";
import VideoPreviewForMap from "../../components/VideoPreviewForMap";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Map() {
  const dispatch = useDispatch();
  const hasVerified = useRef(false);
  const setMarkers = useRef(false);
  const timeoutId = useRef(null);

  const mapContainer = useRef(null);
  const locationsMap = useRef(null);
  const geocoder = useRef(null);
  const geolocate = useRef(null);
  const navControl = useRef(null);
  const markers = useRef(null);

  const videolocations = useSelector(
    (state) => state.videolocation.videolocations
  );

  useEffect(() => {
    if (!hasVerified.current) {
      dispatch(videolocationsCall());
      dispatch(setCurrentPage("map"));
      hasVerified.current = true;
    }
  });

  useEffect(() => {
    if (locationsMap.current) return;
    locationsMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-95.7928, 34.0264],
      zoom: 3.22,
    });

    navControl.current = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
    });

    geolocate.current = new mapboxgl.GeolocateControl({
      positionOptions: { enableAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    locationsMap.current.addControl(geocoder.current, "top-left");
    locationsMap.current.addControl(navControl.current, "bottom-right");
    locationsMap.current.addControl(new mapboxgl.FullscreenControl());
    locationsMap.current.addControl(geolocate.current, "bottom-right");
  });

  useEffect(() => {
    if (!locationsMap.current) return;
    if (markers.current) {
      markers.current.on("mouseenter", () => {
        mapContainer.getCanvas().style.cursor = "pointer";
      });
    }
  });

  useEffect(() => {
    if (!setMarkers.current) {
      timeoutId.current = setTimeout(() => {
        videolocations.forEach((spot) => {
          const popupNode = document.createElement("div");
          ReactDOM.render(<VideoPreviewForMap each={spot} />, popupNode);
          markers.current = new mapboxgl.Marker({
            color: "#ec127f",
          })
            .setLngLat([
              spot.location.coordinates.longitude,
              spot.location.coordinates.latitude,
            ])
            .setPopup(
              new mapboxgl.Popup({
                closeButton: false,
                maxWidth: "100%",
              }).setDOMContent(popupNode)
            )
            .addTo(locationsMap.current);
        });
        setMarkers.current = true;
      }, 8e2);
    }
  });

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
      dispatch(setCurrentPage("other"));
    };
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="locationmap-container" />
    </div>
  );
}

function MapLocations() {
  return (
    <div className="MapLocations">
      <Map mapName={"locations"} />
    </div>
  );
}

export default MapLocations;
