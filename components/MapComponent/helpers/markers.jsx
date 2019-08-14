import { Marker, Layer, Feature } from "react-mapbox-gl";

function Markers(props) {
	let { vlogs, video_player, playVideo, map, business, playing, setActivePin } = props
	if(vlogs) {
		return(
			<div>
				{
					vlogs.locations.map((location, index) => {
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
									playVideo()
									video_player.seekTo(location.time_start);
									map.flyTo({
										center: location.coordinates,
										zoom: 15,
										offset: [100, 0]
									});	
								}}
								onMouseEnter={() =>{
									map.getCanvas().style.cursor = 'pointer';
								}}
								onMouseLeave={() =>{
									map.getCanvas().style.cursor = '';
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
	if(business) {
		console.log("PINS HERE")
		return(
			<div>
				<Layer
					type="symbol"
					layout={{ 
						"icon-image": "red-pin",
						"icon-size" : 1.3,
						"text-allow-overlap": true,
						'icon-allow-overlap': true,
					}}
					onClick = {(e) =>{
					}}
					onMouseEnter={() =>{
						map.getCanvas().style.cursor = 'pointer';
					}}
					onMouseLeave={() =>{
						map.getCanvas().style.cursor = '';
					}}
				   >
				  	<Feature 
				  	coordinates={business.coordinates}
				  	/>

				</Layer>
			</div>
		)
	}
	if(!vlogs || !business) return <div></div>
	
}

export default Markers;