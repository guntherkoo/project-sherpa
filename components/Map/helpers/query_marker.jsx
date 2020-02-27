import { Marker, Layer, Feature } from "react-mapbox-gl";

const QueryMarker = ({queryCoords, hoverPin}) => {
  console.log(queryCoords)
    return(
      <Layer
      	type="symbol"
        id = "queryCoords"
      	layout={{ 
      		"icon-image": "red-pin",
      		"icon-size" : 1.3
      	}} >
          <Feature 
            coordinates = {queryCoords} /> 	

      </Layer>
    )
  } 

export default QueryMarker