import Type from './geocoder.types';

const INIT_STATE = {
	input_location: null,
	input_business: null
}

const geocoderReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case Type.FETCH_INPUT_LOCATION_SUCCESS:
			return {
				...state,
				input_location: action.payload
			}
		case Type.FETCH_BUSINESS_LOCATION_SUCCESS:
			return {
				...state,
				input_business: action.payload
			}
		default:
			return state
	}
}

export default geocoderReducer;