import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as turf from '@turf/turf'

import s from './VideoBuilder.scss';

import Geocode from '../Geocode';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';
import { addLocation, firestore } from '../../lib/firebase';


const VideoBuilder = ({ map, business_input, fetchBusinessLocation, locationPins, updateInput, handleSubmit, input }) => {
	if(!locationPins) return false
	let loc_coords = locationPins.map(coord => coord.data.coordinates);
	let line = turf.lineString(loc_coords);
	let bbox = turf.bbox(line);

	return (
		<div className={s('VideoBuilder')}>
			<Geocode message= {"Business, POI, etc"} 
				disabled={  false  }
				fetchBusiness = { fetchBusinessLocation } 
				business_input = { business_input }
				map = { map } 
				bbox = { bbox }
				updateInput = { updateInput }
				handleSubmit = { handleSubmit }
				input = { input }
				/> 
		</div>
	)
}	
  

export default VideoBuilder;