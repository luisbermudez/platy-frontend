import React, { useRef, useEffect, useState } from "react";
import "./mapAddLocation.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignupOrLogin from "../../components/SignupOrLogin";
import { setCoordinates } from "../../redux/videolocationSlice";
import { useDispatch } from "react-redux";
import { ChevronRight } from "react-bootstrap-icons";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MapAddLocation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const coordinates = useSelector((state) => state.videolocation.coordinates);
  const [hasAddedPin, setHasAddedPin] = useState(false);
  const navigate = useNavigate();
  const show = useRef(true);

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
      center: [-73.9615, 40.7801],
      around: [-73.9615, 40.7801],
      pitch: [64],
      bearing: [-6],
      zoom: 12.15,
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
        setHasAddedPin(true);
      });
    });
  });

  useEffect(() => {
    if (coordinates) {
      const longitude = Number(coordinates.lng);
      const latitude = Number(coordinates.lat);
      marker.current
        .setLngLat([longitude, latitude])
        .addTo(mapAddLocation.current);
      setHasAddedPin(true);
    }
  }, [coordinates]);

  return (
    <div className="MapAddLocation">
      <>
        {!isLoggedIn && (
          <Modal
            show={show.current}
            animation={false}
            centered
            className="MapAddLocations-modal"
          >
            <div className="modal-container">
              <p onClick={() => navigate(-1)} className="goback">
                x
              </p>
              <SignupOrLogin />
            </div>
          </Modal>
        )}
        <>
          <h1 className="dropAPin">Share your flow</h1>
          <div ref={mapContainer} className="addlocationmap-container" />
          {hasAddedPin && (
            <p
              onClick={() => navigate("/add-location-2")}
              className="nextButton pinNext"
            >
              Next <ChevronRight className="chevronRightPinAdded" />
            </p>
          )}
        </>
      </>
    </div>
  );
}

export default MapAddLocation;
