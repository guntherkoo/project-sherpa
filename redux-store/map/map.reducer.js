import Type from './map.types';

const mapReducer = (state = {}, action) => {
	switch (action.type) {
		// Map Reducers
		case Type.SET_MAP:
			return {
				...state,
				set_map: action.payload
			}
		case Type.SET_ACTIVE_PIN:
			return {
				...state,
				pin_id : action.payload
			}
		case Type.SET_CENTER_MAP:
			return {
				...state,
				center: action.payload
			}
		case Type.HOVER_PIN:
			return {
				...state,
				hover_id: action.payload
			}
		default:
			return state
	}
}


export default mapReducer;