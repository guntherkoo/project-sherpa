import { Component } from 'react';
// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import Markers from './helpers/markers';
import s from './MapComponent.scss';
import locations from '../dummy_data/locations.json';
// import Geocoder from './helpers/geocoder';
import Geocoder from '../Geocoder';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';


class MapComponent extends Component {

	render() {
		let { 
			setMapToProps, 
			fetchInputLocation,
			input_location,
			getCurrentCity,
			current_city,
			setActivePin, 
			player, 
			playVideo, 
			content, 
			map, 
			updateExperience,
			progress_stage,
			business } = this.props
		let { 
			bounds, 
			center, 
			zoom, 
			style } = mapDefault
		return(
			<Map
				className = {s('MapComponent')}
				style={ style }
				center = { (content ? content.coordinates : center) } 
				maxBounds = { bounds }
				zoom = { zoom }
				onStyleLoad= { map => {
				  	setMapToProps(map);
			  	}}
				>

					<Geocoder 
						map= { map } 
						fetchInputLocation= { fetchInputLocation }
						input_location = { input_location }
						getCurrentCity = { getCurrentCity } 
						current_city = { current_city }
						content = { content } 
						updateExperience = { updateExperience }
						progress_stage = { progress_stage }/>
				
					<Markers 
						setActivePin = { setActivePin }
						video_player = { player }
						playVideo = { playVideo }
						content = { content } 
						map = { map }
						business = { business }/>

			</Map>
		)
	}
}

const mapStateToProps = state => {
	return {
		map 			: state.map,
		location 		: state.location,
		player			: state.player,
		input_location	: state.input_location,
		current_city 	: state.current_city
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		},
		setActivePin(location) {
			dispatch(Action.setActivePin(location));
		},
		playVideo() {
			dispatch(Action.playVideo());	
		},
		fetchInputLocation(location) {
			dispatch(Action.fetchInputLocation(location))
		},
		getCurrentCity(city) {
			dispatch(Action.getCurrentCity(city))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapComponent);