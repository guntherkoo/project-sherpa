import React, { Component } from 'react';

// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import s from '../../styles/MapComponent.scss';


export default class MapComponent extends Component {
	render() {
		let { bounds, center, zoom, style } = mapDefault
		return(
			<Map
				className = {s('MapComponent')}
				style={ style }
				center = { center } 
				maxBounds = { bounds }
				zoom = { zoom } />
		)
	}
}