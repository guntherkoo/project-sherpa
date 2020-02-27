import { Marker, Layer, Feature } from "react-mapbox-gl";


const mouseEnter = (e) => {
  console.log('entered')
}

const LocationPins = ({queryCoords, locationPins, hoverPin }) => {
    return(
      <Layer
      	type="symbol"
        id = "marker"
      	layout={{ 
      		"icon-image": "red-pin",
      		"icon-size" : 1.3,
      		"text-allow-overlap": true,
      		'icon-allow-overlap': true,
      	}}>
          {
            locationPins.map((pin, i) => {
              return(
                <Feature 
                  key = { pin.id }
                  coordinates = {pin.data.coordinates}
                  onClick={(e, f, g) => {
                    console.log(e,f,g)
                    hoverPin(pin)
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