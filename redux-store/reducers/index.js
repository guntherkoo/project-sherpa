import { Type } from '../actions';

// REDUCERS
export default function reducer(state = {}, action) {
	switch (action.type) {
		case Type.TOGGLE:
			return  {
				...state,
				tap: !state.tap
			}

		case Type.INCREMENT:
			return {
				...state,
				count: state.count + 1
			}
			
		case Type.DECREMENT:
			return {
				...state,
				count: state.count - 1
			}
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
		default:
			return state
	}
}