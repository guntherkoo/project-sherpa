import { Type } from '../actions';

export default function (state = {}, action) {
	switch (action.type) {
		// Map Reducers
		case Type.SET_MAP:
			return {
				...state,
				set_map: action.payload
			}
		case Type.ACTIVE_PIN:
			return {
				...state,
				location: action.payload
			}
		default:
			return state
	}
}