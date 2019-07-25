import { Type } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
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
		default:
			return state
	}
}