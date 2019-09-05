import { Type } from '../actions';

const handleFetchInputLocationSuccess = (state, action) => {
	return {
		...state,
		content_location: action.payload
	}
}

const initialContentState = {
	businesses: []
}

export default (state = initialContentState, action) => {
	switch (action.type) {
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
		case Type.ADD_BUSINESS:
			return {
				...state,
				businesses: [...state.businesses, action.payload] 
			}
		case Type.UPDATE_NEW_BUSINESS:
			const newState = { ...state };
			newState.businesses = [
				newState.businesses[action.position],
				{'time_start': action.payload}
			];
			return newState;
			// return {
			// 	...state,
			// 	businesses: [
			// 		...state.businesses.slice(0,action.position),
			// 		{'time_start': action.payload},
			// 		...state.businesses.slice(action.position+1)
			// 	]
			// }
		default:
			return state
	}
}