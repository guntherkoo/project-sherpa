import ReactMapboxGl from "react-mapbox-gl";

const MapContainer = ReactMapboxGl({
  accessToken: process.env.MAPBOX_KEY
});

export default MapContainer;