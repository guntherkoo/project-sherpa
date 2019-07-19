import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import s from '../MapComponent.scss';

function yieldedCities(content_location) {
	if(content_location) {
		let cities =content_location.features.map(feature => {
			return(
				<a href="#" data-place-name= { feature.place_name }>{ feature.place_name }</a>
			)
		}) 
		return cities
	}
	
}

function Geocoder(props) {
	// props.map.addControl(
	// 	new MapboxGeocoder({
	// 		accessToken: process.env.MAPBOX_KEY,
	// 		zoom: 4,
	// 		placeholder: "Where did you go?",
			
	// 	})
	// );
	let { map, fetchContentLocation, content_location } = props;


	return (
		<div className={s('search_results')}>
			<input className={s('init_location')} 
				type="text" 
				placeholder="What city did you visit?" 
				onChange = { e => {
					if(e.target.value) {
						fetchContentLocation(e.target.value)
					}
				}}/>
			{ yieldedCities(content_location) }
		</div>
		
	)
}

export default Geocoder;