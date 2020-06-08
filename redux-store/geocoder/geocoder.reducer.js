import Type from './geocoder.types';
import { updateGeocoder } from './geocoder.utils'

const INIT_STATE = {
	input_location: null,
	input_business: null,
	geolocation: {
		location: {
			area_name: ''
		},
		business: {
			business_name: ''
		}
	}
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
		case Type.UPDATE_GEOLOCATION:
			return{
				...state,
				geolocation: updateGeocoder(state.geolocation, action.payload)
			}
		default:
			return state
	}
}

export default geocoderReducer;