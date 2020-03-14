import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router'

import s from './LocationBuilder.scss';

import Geocode from '../Geocode';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';
import { addLocation, firestore } from '../../lib/firebase';


const LocationBuilder = ({ location_input, business_input, fetchInputLocation, fetchBusinessLocation, geolocation, updateGeolocation, map, updateLocation, updateInput1, updateInput2, updateInput3, updateInput4, handleSubmit, clearState, location_builder, locations, input1, input2, input3, input4 }) => {
	let { business_name } = location_builder;
	let { business, location } = geolocation
	return (
		<div className={s('LocationBuilder')}>
			
			{( !location.area_name ? 
				<Geocode message= {"State, City, Country"} 
					disabled={ false } 
					fetchLocation = { fetchInputLocation } 
					updateLocation = { updateLocation }
					location_input = { location_input }
					map = { map }
					input = { input1 }  
					updateInput = { updateInput1 }
					location = { geolocation.location }
					business = { geolocation.business } 
					handleSubmit = { handleSubmit }/> : 
					<div className={s("entered-name")}>
						<h2>{location.area_name}</h2>
						<div className={s("x-out")}
							onClick={()=> {
								clearState()
								updateGeolocation({location:'', business:''})
							}}>
							&#10005;
						</div>
					</div>)}	
			
			{( !business.business_name ? 
				<Geocode message= {"Business, POI, etc"} 
					disabled={ ( location.area_name ? false : true) }
					fetchBusiness = { fetchBusinessLocation } 
					updateLocation = { updateLocation }
					business_input = { business_input }
					bbox = { location.bbox }
					map = { map }
					input = { input2 } 
					updateInput = { updateInput2 } 
					handleSubmit = { handleSubmit } /> : 
					<div className={s("entered-name")}>
						<h2>{business.business_name}</h2>
						<div className={s("x-out")}
							onClick={()=>{
								updateGeolocation({business:''})
							}}>
							&#10005;
						</div>
					</div>)}
			<input className={s('input')} 
				type='number' 
				placeholder='Price' 
				value = {input3}
				onChange = { e => {	
					let input_value = e.target.value;
					updateInput3(input_value)
					let new_biz = { ...business };
					new_biz.price = parseInt(input_value);
					updateGeolocation({ business: new_biz})
				}}/>
			<textarea 
				placeholder="Additional Info"
				type = 'text'
				value = { input4 }
				onChange = { e => {	
					let input_value = e.target.value;
					updateInput4(input_value)
					let new_biz = { ...business };
					new_biz.additional_info = input_value;
					updateGeolocation({ business: new_biz });
				}}></textarea>

			<a className="submit"
				onClick={()=> {
					let find_location = locations.find(sf => sf.data.business.business_name === business.business_name);
					if(!find_location) {
						addLocation(geolocation);
						clearState();
						updateGeolocation({location:'', business:''});
						alert('Location Submitted')
					} else {
						clearState();
						updateGeolocation({location:'', business:''});
						alert('Location Already Exists!')
					}
					
				}}>Submit</a>	
		</div>
	)
}

const mapStateToProps = state => {
	return {
		location_input: state.geocoder.input_location,
		business_input: state.geocoder.input_business,
		map: state.map.set_map,
		geolocation: state.geocoder.geolocation
	}
}


const mapDispatchToProps = dispatch => ({
	fetchInputLocation: (location, bbox) => dispatch(GeocodeAction.fetchInputLocation(location)),
	fetchBusinessLocation: (location, bbox) => dispatch(GeocodeAction.fetchBusinessLocation(location, bbox)),
	updateGeolocation: (loc) => dispatch(GeocodeAction.updateGeolocation(loc))
})

export default connect( mapStateToProps, mapDispatchToProps )(LocationBuilder);