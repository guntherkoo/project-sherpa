import Type from './locations.types';

const INIT_STATE = {
	locations: null
}

const locationsReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case Type.FETCH_LOCATIONS:
			return {
				...state,
				locations: action.payload
			}
		case Type.VLOG_LOCATIONS:
			return {
				...state,
				vlog_locations: action.payload
			}
		default:
			return state
	}
}

export default locationsReducer;