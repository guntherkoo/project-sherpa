import MapType from './map.types';

const mapReducer = (state = {}, action) => {
	switch (action.type) {
		// Map Reducers
		case MapType.SET_MAP:
			return {
				...state,
				set_map: action.payload
			}
		case MapType.SET_ACTIVE_PIN:
			return {
				...state,
				pin_id : action.payload
			}
		case MapType.SET_CENTER_MAP:
			return {
				...state,
				center: action.payload
			}
		case MapType.HOVER_PIN:
			return {
				...state,
				hover_id: action.payload
			}
		default:
			return state
	}
}


export default mapReducer;