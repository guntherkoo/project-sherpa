import React, { Component } from 'react';
// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import Markers from './helpers/markers';
import s from './MapComponent.scss';
import locations from '../dummy_data/locations.json';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';


class MapComponent extends Component {

	render() {
		let { map, progress, setMapToProps} = this.props
		let { bounds, center, zoom, style } = mapDefault

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
					<Markers 
						setActiveLocation = { this.props.setActiveLocation }
						video_player = { this.props.player }
						playVideo = { this.props.playVideo }/>
			</Map>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		progress: state.progress,
		map 	: state.map,
		location: state.location,
		player	: state.player 
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trackVideoProgress(time) {
			dispatch(Action.trackVideoProgress(time));
		},
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		},
		setActiveLocation(location) {
			dispatch(Action.setActiveLocation(location));
		},
		playVideo() {
			dispatch(Action.playVideo());	
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapComponent);