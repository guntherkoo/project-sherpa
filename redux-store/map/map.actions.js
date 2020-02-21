import Type from './map.types';

const MapAction = {
	// Map Actions
		// adds map functionality across components
	setMapToProps: (map) => {
		return {
			type: Type.SET_MAP,
			payload: map
		}
	},
	setActivePin : (pin) => {
		return {
			type: Type.SET_ACTIVE_PIN,
			payload: pin
		}
	},
	setCenterMap: (center)=> {
		return {
			type: Type.SET_CENTER_MAP,
			payload: center
		}
	},
	hoverPin: (pin) => {
		return {
			type: Type.HOVER_PIN,
			payload: pin
		}
	}
}

export { MapAction };
