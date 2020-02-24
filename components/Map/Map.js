import { Component } from 'react';
// Helpers
import MapContainer from './helpers/map';
// import { mapDefault } from './helpers/default';
import Prices from './helpers/prices';
import s from './Map.scss';


// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Action } from 'redux-store/actions';
import { MapAction } from '../../redux-store/map/map.actions';


class Map extends Component {


	static defaultProps = {
		hover_marker: null,
		map_center: [-71.2278118412173,46.80942018867191],
		zoom : [12.126913726486569]
	}
	render() {
		let { setMapToProps, businesses, hoverPin, hover_marker, map_center, zoom, urlQuery } = this.props

		let queryCoords = [parseFloat(urlQuery.lng), parseFloat(urlQuery.lat)]

		return(
			<MapContainer
				className = {s('Map')}
				style = {'mapbox://styles/bfmcgo2/cje1yog8zc5xi2rq99geum951'}
				zoom = { zoom }
				center = { (isNaN(queryCoords[0])||isNaN(queryCoords[1]) ? map_center : queryCoords ) }
				onClick = {()=> {
					hoverPin(null);
				}}
				onStyleLoad= { map => {
				  	setMapToProps(map);
			  	}}>

			  	<Prices 
			  		businesses={ businesses }
			  		hoverPin= { hoverPin }
			  		hover_marker = { hover_marker }/>
			</MapContainer>
		)
	}
}

const mapStateToProps = state => {
	return {
		businesses: state.businesses,
		hover_marker: state.map.hover_id
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