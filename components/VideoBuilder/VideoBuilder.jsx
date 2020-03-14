import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as turf from '@turf/turf'

import s from './VideoBuilder.scss';

import Geocode from '../Geocode';
import VideoPlayer from '../VideoPlayer';
import LocationTimestamps from './helpers/location_timestamps';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';
import { addLocation, firestore } from '../../lib/firebase';


const VideoBuilder = ({ map, business_input, geolocation, updateGeolocation, fetchBusinessLocation, locationPins, updateInput, handleSubmit, input, setVideoData, video_data }) => {
	if(!locationPins) return false
	let loc_coords = locationPins.map(coord => coord.data.business.coordinates);
	let line = turf.lineString(loc_coords);
	let bbox = turf.bbox(line);

	let { business } = geolocation;

	return (
		<div className={s('VideoBuilder')}>
			<VideoPlayer />
			<div className={s('input-container')}>
				{(!video_data.url ? 
					<input type="text"
						className={s('input')}
						placeholder={ "Enter Video URL" }					
						onKeyPress = {(e) => {
					        if(e.key === 'Enter') {	 
								let input_value = e.target.value;
					        	setVideoData({url: input_value});
					        }
					    }}/> : <h1>{video_data.url}</h1>)}
				


			</div>
			<div className={s('input-container')}>
				{(!video_data.title ? 
					<input type="text"
						className={s('input')}
						placeholder={ "Video Title" }					
						onKeyPress = {(e) => {
					        if(e.key === 'Enter') {	 
								let input_value = e.target.value;
					        	setVideoData({title: input_value});
					        }
					    }}/> : <h1>{video_data.title}</h1>)}
			</div>	
			{(!business.business_name ? 
				<Geocode message= {"Business, POI, etc"} 
					disabled={  false  }
					fetchBusiness = { fetchBusinessLocation } 
					business_input = { business_input }
					map = { map } 
					bbox = { bbox }
					updateInput = { updateInput }
					handleSubmit = { handleSubmit }
					input = { input }
					/> : 
					<div className={s("entered-name")}>
						<h2>{business.business_name}</h2>
						<div className={s("x-out")}
							onClick={()=>{
								updateGeolocation({business:''})
							}}>
							&#10005;
						</div>
					</div>)}
			{(video_data.locations ? 
				<LocationTimestamps 
					video_data = { video_data }
					locationPins = { locationPins }/>:
				<div></div>)}
		</div>
	)
}	
  

export default VideoBuilder;