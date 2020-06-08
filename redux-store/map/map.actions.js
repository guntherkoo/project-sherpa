import MapType from './map.types';

const MapAction = {
	// Map Actions
		// adds map functionality across components
	setMapToProps: (map) => {
		return {
			type: MapType.SET_MAP,
			payload: map
		}
	},
	setActivePin : (pin) => {
		return {
			type: MapType.SET_ACTIVE_PIN,
			payload: pin
		}
	},
	setCenterMap: (center)=> {
		return {
			type: MapType.SET_CENTER_MAP,
			payload: center
		}
	},
	hoverPin: (pin) => {
		return {
			type: MapType.HOVER_PIN,
			payload: pin
		}
	}
}

export { MapAction };
