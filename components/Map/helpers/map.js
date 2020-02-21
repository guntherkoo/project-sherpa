import ReactMapboxGl from "react-mapbox-gl";

const MapContaine = ReactMapboxGl({
  accessToken: process.env.MAPBOX_KEY
});

export default MapContaine;