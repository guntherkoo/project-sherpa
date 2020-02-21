import React, { Component } from 'react';
import Router from 'next/router'

import s from './Geocode.scss';
import GeocodeResults from './helpers/GeocodeResults';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';


const handleSubmit = ({text, center, bbox}, map) => {
	map.jumpTo({center});
	Router.push({ pathname:'/addlocations', query: {name: text, lng: center[0], lat: center[1]}})
}

const Geocode = ({message, fetchLocation, fetchBusiness, location, map, business, disabled, updateLocation, bbox, updateInput, input}) => (
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
		        	if(location) {
		        		let { text, center, bbox } = location.features[0];
		        		handleSubmit(location.features[0], map)
		        		updateLocation({area_name: text, bbox})
		        	} 
		        	if(business) {
		        		let { text, center } = business.features[0];
		        		handleSubmit(business.features[0], map)
		        		updateLocation({business_name: text, coordinates: center})
		        	}
		        }
		    }}/>
		{( location || business ? 
			<GeocodeResults 
				results={ (location ? location.features : business.features) } 
				map = { map } 
				handleSubmit ={handleSubmit}
				updateLocation= { updateLocation }
				input = {input}/> : <div></div>)}		
	</div>
)




export default Geocode;