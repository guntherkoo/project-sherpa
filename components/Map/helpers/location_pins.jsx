import { Marker, Layer, Feature } from "react-mapbox-gl";



const LocationPins = ({queryCoords, locationPins, hoverPin, pinClick }) => {
    return(
      <Layer
      	type="symbol"
        id = "marker"
      	layout={{ 
      		"icon-image": "red-pin",
      		"icon-size" : 1.0,
      		"text-allow-overlap": true,
      		'icon-allow-overlap': true,
          'symbol-sort-key': 2,
      	}}>
          {
            locationPins.map((pin, i) => {
              return(
                <Feature 
                  key = { pin.id }
                  coordinates = {pin.data.business.coordinates}
                  onClick={(e, f, g) => {
                    pinClick(pin)
                  }}
                  onMouseEnter={(e)=> {
                    if(e) hoverPin(pin)
                  } }
                  onMouseLeave={(e) => {
                    if(e) hoverPin(null)
                  }}/>
              )  
            })
          }
      </Layer>
    )
  } 

export default LocationPins