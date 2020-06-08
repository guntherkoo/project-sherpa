import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as turf from '@turf/turf'

import s from './VideoBuilder.scss';

import Geocode from '../Geocode';
import VideoPlayer from '../VideoPlayer';
import LocationTimestamps from './helpers/location_timestamps';

import { VideoAction } from '../../redux-store/video/video.actions';
import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';
import { addVideo, firestore } from '../../lib/firebase';


const VideoBuilder = ({ map, business_input, geolocation, updateGeolocation, fetchBusinessLocation, locationPins, updateInput, handleSubmit, input, setVideoData, video_data, setVideoUrl, add_video_location, fetchInputLocation, input_location }) => {
	if(!locationPins) return false
	let filterLocation = locationPins.filter(sf => {
		let area_name = sf.data.location.area_name.split(' ').join('_').toLowerCase();
		console.log(area_name);
		return area_name === add_video_location 
	})
	if(!input_location) fetchInputLocation(add_video_location);
	
	console.log(add_video_location);
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
					        	setVideoUrl(input_value);
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
					bbox = { (input_location ? input_location.features[0].bbox : bbox) }
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
					locationPins = { locationPins } />:
				<div></div>)}
			<a onClick={()=>{
				addVideo(video_data);
				setVideoData("")
			}}>Submit</a>
		</div>
	)
}	

const mapStateToProps = state => {
	return {
		input_location: state.geocoder.input_location
	}
}

const mapDispatchToProps = dispatch => ({
	setVideoUrl:(url) => dispatch(VideoAction.setVideoUrl(url)),
	fetchInputLocation:(loc) => dispatch(GeocodeAction.fetchInputLocation(loc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoBuilder);