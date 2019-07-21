import { Type } from '../actions';

const handleFetchInputLocationSuccess = (state, action) => {
	return {
		...state,
		content_location: action.payload
	}
}

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		// Map Reducers
		case Type.MAP:
			return {
				...state,
				map: action.payload
			}
		case Type.ACTIVE_PIN:
			return {
				...state,
				location: action.payload
			}
		// Video Reducers
		case Type.VIDEO_CONTROLS:
			return {
				...state,
				player: action.payload
			}
		case Type.VIDEO_PLAY:
			return {
				...state,
				playing: true
			}
		// Content Reducers
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