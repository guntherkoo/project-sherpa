import { Marker, Layer, Feature } from "react-mapbox-gl";

const QueryMarker = ({queryPin, hoverPin}) => {
    return(
      <Layer
      	type="symbol"
        id = "queryPin"
      	layout={{ 
      		"icon-image": "red-pin",
      		"icon-size" : 1.3
      	}} >
          <Feature 
            coordinates = {queryPin} /> 	

      </Layer>
    )
  } 

export default QueryMarker