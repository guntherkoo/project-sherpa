// Helpers
import Map from './helpers/map';
import { mapDefault } from './helpers/default';
import s from './MapComponent.scss';


function MapComponent(props) {
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

export default MapComponent;