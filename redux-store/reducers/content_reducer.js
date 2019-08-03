import { Type } from '../actions';

const handleFetchInputLocationSuccess = (state, action) => {
	return {
		...state,
		content_location: action.payload
	}
}

export default (state = {}, action) => {
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
		case Type.UPDATE_NEW_VLOG:
			return {
				...state,
				new_vlog: action.payload
			}
		default:
			return state
	}
}