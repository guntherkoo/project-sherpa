import React, { Component } from 'react';

// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';


export default class MapComponent extends Component {
	render() {
		let { bounds, center, zoom, style } = mapDefault
		return(
			<Map
				className = 'MapComponent'
				style={ style }
				center = { center } 
				maxBounds = { bounds }
				zoom = { zoom } />
		)
	}
}