import { Marker, Layer, Feature } from "react-mapbox-gl";
import locations from '../../dummy_data/locations.json';

function Markers(props) {
	return(
		<div>
			{
				locations.map((location, index) => {
					return (
						<Layer
						  type="symbol"
						  key= {index}
						  layout={{ 
						  	"icon-image": "red-pin",
						  	"icon-size" : 1.3,
						  	"text-allow-overlap": true,
						  	'icon-allow-overlap': true,
						   }}>
						  	<Feature 
						  	coordinates={location.coordinates}
						  	/>

						</Layer>
					)
				})
			}
		</div>
	)
}

export default Markers;