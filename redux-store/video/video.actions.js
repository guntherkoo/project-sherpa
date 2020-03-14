import VideoType from './video.types';

const VideoAction = {

	setVideoControls: (player) => {
		return {
			type: VideoType.VIDEO_CONTROLS,
			payload: player
		}
	},
	playVideo: () => {
		return {
			type: VideoType.VIDEO_PLAY
		}
	},
	videoTime: (time) => {
		return {
			type: VideoType.VIDEO_TIME,
			payload: time
		}
	},
	setVideoData: (data) => {
		return {
			type: VideoType.VIDEO_DATA,
			payload: data
		}
	},
	addVideoPinClick: (pin) => {
		return {
			type: VideoType.ADD_VIDEO_PIN_CLICK,
			payload: pin
		}
	}

}

export { VideoAction };
