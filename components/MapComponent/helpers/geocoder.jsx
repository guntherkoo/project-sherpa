import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import s from '../MapComponent.scss';

function yieldedCities({input_location, map, getCurrentCity, updateExperience}) {

	if(input_location) {
		let cities = input_location.features.map((feature, key) => {
			let { center, bbox, place_name  } = feature
			let init_experience = { "city": place_name, "coordinates": center }
			return(
				<a  key= {key}
					className={s('location_results')} 
					data-place-name= { feature.place_name }
					onClick={()=> {
						map.jumpTo({
							center: center
						})
						getCurrentCity(feature);
						updateExperience(init_experience)

					}}>{ feature.place_name }</a>
			)
		}) 
		return cities
	}
	
}

function Geocoder(props) {
	let { 
		map, 
		fetchInputLocation, 
		input_location,  
		current_city, 
		content, 
		updateExperience, 
		progress_stage } = props;

	if(!current_city && !content && progress_stage === 1) {
		return (
			<div className={s('search_results')}>
				<input className={s(['add_input'])} 
					type="text" 
					placeholder="What city did you visit?" 
					onChange = { e => {
						if(e.target.value) {
							fetchInputLocation(e.target.value)
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