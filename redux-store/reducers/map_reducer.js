import { Type } from '../actions';

export default (state = {}, action) => {
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
				pin_id : action.payload,
			}
		default:
			return state
	}
}