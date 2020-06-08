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
		case Type.VIDEO_TIME:
			return {
				...state,
				video_time: action.payload
			}
		default:
			return state
	}
}