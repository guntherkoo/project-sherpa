import { Component } from 'react';
// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import Markers from './helpers/markers';
import s from './MapComponent.scss';
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
			player, 
			playVideo,
			vlogs, 
			map,
			updateExperience,
			progress_stage,
			business,
			playing,
			setActivePin } = this.props

		let { 
			bounds, 
			center, 
			zoom, 
			style } = mapDefault

			console.log(player)
		return(
			<Map
				className = {s('MapComponent')}
				style={ style }
				center = { (vlogs ? vlogs.coordinates : center) } 
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
						vlogs = { vlogs } 
						updateExperience = { updateExperience }
						progress_stage = { progress_stage }/>
				
					<Markers 
						video_player = { player }
						playVideo = { playVideo }
						vlogs = { vlogs } 
						map = { map }
						business = { business }
						playing = { playing }
						setActivePin= { setActivePin }/>

			</Map>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		player			: state.video.player,
		input_location	: state.input_location,
		current_city 	: state.current_city,
		playing			: state.video.playing
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		},
		setActivePin(pin) {
			dispatch(Action.setActivePin(pin))
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