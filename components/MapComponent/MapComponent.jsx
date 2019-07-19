import React, { Component } from 'react';
// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import Markers from './helpers/markers';
import s from './MapComponent.scss';
import locations from '../dummy_data/locations.json';
import Geocoder from './helpers/geocoder';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';


class MapComponent extends Component {

	activeMarkers({ setActiveLocation, player, playVideo, content }) {
		if(content) {
			return(
				<Markers 
					setActiveLocation = { setActiveLocation }
					video_player = { player }
					playVideo = { playVideo }
					content = { content } />
			)
		}		
	}

	addGeocoder({ content, map, fetchContentLocation, content_location }) {
		if(!content && map) {
			return(
				<Geocoder 
					map= { map } 
					fetchContentLocation= { fetchContentLocation }
					content_location = { content_location }/>
			)
		}
	}

	render() {
		let { setMapToProps} = this.props
		let { bounds, center, zoom, style } = mapDefault
		console.log(this.props)
		return(
			<Map
				className = {s('MapComponent')}
				style={ style }
				center = { center } 
				maxBounds = { bounds }
				zoom = { zoom }
				onStyleLoad= { map => {
				  	setMapToProps(map);
			  	}}
				>
					{this.addGeocoder(this.props)}
					{this.activeMarkers(this.props)}
			</Map>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		map 			: state.map,
		location 		: state.location,
		player			: state.player,
		content_location: state.content_location
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		},
		setActiveLocation(location) {
			dispatch(Action.setActiveLocation(location));
		},
		playVideo() {
			dispatch(Action.playVideo());	
		},
		fetchContentLocation(location) {
			dispatch(Action.fetchContentLocation(location))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapComponent);