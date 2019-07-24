import { Type } from '../actions';

export default function (state = {}, action) {
	switch (action.type) {
		case Type.CONTENT:
			return {
				...state,
				content: action.payload
			}
		case Type.FETCH_INPUT_LOCATION_SUCCESS:
			return {
				...state,
				input_location: action.payload
			}
		case Type.CURRENT_CITY: 
			return {
				...state,
				current_city: action.payload
			}
		case Type.CREATE_EXPERIENCE:
			return {
				...state,
				experience: action.payload
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