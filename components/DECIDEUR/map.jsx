import React from "react";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 36.743724,
  lng: 3.075905,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(15);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const createMapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={createMapOptions}
    >
      <MarkerF position={center} onLoad={() => console.log("Marker Loaded")} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
