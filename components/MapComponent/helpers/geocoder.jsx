import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import s from '../MapComponent.scss';

function yieldedCities({content_location, map, getCurrentCity}) {

	if(content_location) {
		let cities = content_location.features.map((feature, key) => {
			let { center, bbox } = feature

			return(
				<a href="#" 
					key= {key}
					className={s('location_results')} 
					data-place-name= { feature.place_name }
					onClick={()=> {
						map.jumpTo({
							center: center
						})
						getCurrentCity(feature);
					}}>{ feature.place_name }</a>
			)
		}) 
		return cities
	}
	
}

function Geocoder(props) {

	
	let { map, fetchContentLocation, content_location,  current_city } = props;
	console.log(current_city)
	if(!current_city){
		return (
			<div className={s('search_results')}>
				<input className={s('init_location')} 
					type="text" 
					placeholder="What city did you visit?" 
					onChange = { e => {
						if(e.target.value) {
							fetchContentLocation(e.target.value)
						}
					}}
					/>
				{ yieldedCities(props) }
			</div>
			
		)
	} else {
		return(
			<div></div>
		)
	}
	
}

export default Geocoder;