import { Type } from '../actions';

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		case Type.PROGRESS:
			return {
				...state,
				progress: action.payload
			}
		case Type.MAP:
			return {
				...state,
				map: action.payload
			}
		case Type.ACTIVE_LOCATION:
			return {
				...state,
				location: action.payload
			}
		default:
			return state
	}
}