import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import "./MapForVideoDetails.css";
import { setCoordinates } from "../../redux/videolocationSlice";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapForVideoDetails = ({ lng, lat, draggable }) => {
  const dispatch = useDispatch();
  const mapContainer = useRef(null);
  const mapForVideoDetials = useRef(null);
  // const geocoder = useRef(null);
  const geolocate = useRef(null);
  const navControl = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (mapForVideoDetials.current) return;
    mapForVideoDetials.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: 3,
    });

    mapForVideoDetials.current.scrollZoom.disable();

    navControl.current = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });

    // geocoder.current = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   marker: false,
    //   mapboxgl: mapboxgl,
    // });

    geolocate.current = new mapboxgl.GeolocateControl({
      positionOptions: { enableAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    marker.current = new mapboxgl.Marker({
      color: "#ec127f",
      draggable: draggable,
    })
      .setLngLat([lng, lat])
      .addTo(mapForVideoDetials.current);

    marker.current.on("dragend", () => {
      const longitude = marker.current.getLngLat().lng.toFixed(4);
      const latitude = marker.current.getLngLat().lat.toFixed(4);
      dispatch(
        setCoordinates({
          lng: longitude,
          lat: latitude,
        })
      );
    });

    // mapForVideoDetials.current.addControl(geocoder.current, "top-left");
    mapForVideoDetials.current.addControl(navControl.current, "bottom-right");
    mapForVideoDetials.current.addControl(new mapboxgl.FullscreenControl());
    mapForVideoDetials.current.addControl(geolocate.current, "bottom-right");
  });

  return (
    <>
      <div ref={mapContainer} className="locationmap-container-videoDetails" />
    </>
  );
};

export default MapForVideoDetails;
