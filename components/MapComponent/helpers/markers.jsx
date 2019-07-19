import { Marker, Layer, Feature } from "react-mapbox-gl";
import locations from '../../dummy_data/locations.json';

function Markers(props) {
	console.log(props)
	let { content, video_player, setActiveLocation, playVideo } = props
	return(
		<div>
			{
				content.locations.map((location, index) => {
					return (
						<Layer
						  type="symbol"
						  key= {index}
						  layout={{ 
						  	"icon-image": "red-pin",
						  	"icon-size" : 1.3,
						  	"text-allow-overlap": true,
						  	'icon-allow-overlap': true,
						   }}
						   onClick = {(e) =>{
						   	video_player.seekTo(location.time_start)
						   	setActiveLocation(location);
						   	playVideo();
						   }}
						   onHover = { e =>{
						   	console.log(e)
						   }}
						   >
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