import VideoType from './video.types';
import { updateVideo, addPin } from './video.utils'

const INIT_STATE = {
	video_data: {
		title: '',
		url : '',
		locations: [],
		video_time: 0
	},
	playing: false
}

const VideoReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case VideoType.VIDEO_CONTROLS:
			return {
				...state,
				player: action.payload
			}
		case VideoType.VIDEO_PLAY:
			return {
				...state,
				playing: true
			}
		case VideoType.VIDEO_TIME:
			return {
				...state,
				video_time: action.payload
			}
		case VideoType.VIDEO_DATA:
			return {
				...state,
				video_data: updateVideo(state.video_data, action.payload)
			}
		case VideoType.ADD_VIDEO_PIN_CLICK:
			return {
				...state,
				video_data: addPin(state.video_data.locations, action.payload)
			}
		default:
			return state
	}
}

export default VideoReducer;