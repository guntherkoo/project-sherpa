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


function MapComponent({map, progress, setMapToProps}) {
	let { bounds, center, zoom, style } = mapDefault
	console.log();
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
				<Markers />
		</Map>
	)
}

const mapStateToProps = state => {
	console.log(state)
	return {
		progress: state.progress,
		map: state.map
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trackVideoProgress(time) {
			dispatch(Action.trackVideoProgress(time));
		},
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapComponent);