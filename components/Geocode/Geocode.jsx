import React, { Component } from 'react';
import { connect } from 'react-redux';

import s from './Geocode.scss';
import GeocodeResults from './helpers/GeocodeResults';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';


const Geocode = ({ message, fetchLocation, fetchBusiness, location_input, map, business_input, disabled, updateGeolocation, updateLocation, business, location, bbox, updateInput, input, handleSubmit }) => (
	<div className={s('Geocode')}>
		<input className={s('input')} 
			type='text' 
			placeholder={ message }
			disabled = { disabled }
			onChange = { e => {	
				let input_value = e.target.value;
					updateInput( input_value );
					if(fetchLocation && input_value)  fetchLocation(input_value)
					if(fetchBusiness && input_value)  fetchBusiness(input_value, bbox)
			}}
			onKeyPress = {(e) => {
				if(!map) return; 
		        if(e.key === 'Enter') {	
		        	if(location_input) {
		        		let { text, center, bbox } = location_input.features[0];
		        		handleSubmit(location_input.features[0], map)
		        		updateGeolocation({location: { area_name: text, bbox }})
		        	} 
		        	if(business_input) {
		        		let { text, center } = business_input.features[0];
		        		handleSubmit(business_input.features[0], map)
		        		updateGeolocation({business: { business_name: text, coordinates: center }})
		        	}
		        }
		    }}/>
		{( location_input || business_input ? 
			<GeocodeResults 
				results={ (location_input ? location_input.features : business_input.features) } 
				result_type = { (location_input ? "location" : "business") }
				map = { map } 
				handleSubmit ={handleSubmit}
				updateLocation= { updateLocation }
				updateGeolocation = { updateGeolocation }
				input = {input}/> : <div></div>)}		
	</div>
)

const mapDispatchToProps = dispatch => ({
	updateGeolocation: (loc) => dispatch(GeocodeAction.updateGeolocation(loc))
})


export default connect(null, mapDispatchToProps)(Geocode);