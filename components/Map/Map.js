import { Component } from 'react';
import { firestore } from '../../lib/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Helpers
import MapContainer from './helpers/map';
	// Pins
import LocationPins from './helpers/location_pins';
import QueryMarker from './helpers/query_marker';
import Prices from './helpers/prices';
import LocationPopup from './helpers/popup';
import HoverPopup from './helpers/hover_popup';
// Styles
import s from './Map.scss';
// Redux
import { MapAction } from '../../redux-store/map/map.actions';


class Map extends Component {

	static defaultProps = {
		hover_marker: null,
		map_center: [-98.09868819768053, 39.270188746881786],
		zoom : [3]
	}

	render() {
		let { setMapToProps, hoverPin, pinClick, hover_marker, map_center, zoom, queryPin, map, locationPins, hover_id, pin_id } = this.props
		return(
			<MapContainer
				className = {s('Map')}
				style = {'mapbox://styles/bfmcgo2/cje1yog8zc5xi2rq99geum951'}
				zoom = { zoom }
				center = { (!queryPin || isNaN(queryPin[0])||isNaN(queryPin[1]) ? map_center : queryPin ) }
				// onClick = {(e, f, g) => {console.log(e, f, g)}}
				onStyleLoad= { map => {
				  	setMapToProps(map);
			  	}}>
			  	{ 
			  		// LOCATION PINS
			  		locationPins ? (
				  		<LocationPins 
				  			locationPins = { locationPins }
				  			hoverPin = { hoverPin } 
				  			pinClick = { pinClick }/>
					  	) : (<div></div>)
			  	}
			  	{ 
			  		// QUERY PIN
			  		queryPin ? (
				  		<QueryMarker 
				  		queryPin = { queryPin }/>
					  	) : (<div></div>)
			  	}
			  	{
			  		hover_marker ? (
			  			<LocationPopup 
			  				hover_marker= { hover_marker }/>
			  		) : (<div></div>)
			  	}
			  	{
			  		hover_id ? (
			  			<HoverPopup 
			  				hover_id = { hover_id }
			  				pin_id = { pin_id }/>
			  		) : ( <div></div> )
			  	}
			  	{
			  		pin_id ? (
			  			<HoverPopup 
			  				hover_id = { pin_id } />
			  		) : ( <div></div> )
			  	}
			  	
			</MapContainer>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map.set_map,
		hover_id : state.map.hover_id,
		pin_id : state.map.pin_id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setMapToProps(map) {
			dispatch(MapAction.setMapToProps(map));
		},
		hoverPin(pin) {
			dispatch(MapAction.hoverPin(pin))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);