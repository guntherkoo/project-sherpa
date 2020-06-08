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
	setVideoUrl: (url) => {
		return {
			type: VideoType.VIDEO_URL,
			payload: url
		}
	},
	addVideoPinClick: (pin) => {
		return {
			type: VideoType.ADD_VIDEO_PIN_CLICK,
			payload: pin
		}
	},
	liveAllVideos: (videos) => {
		return {
			type: VideoType.LIVE_ALL_VIDEOS,
			payload: videos
		}
	},
	editTargetVideo: (video) => {
		return {
			type: VideoType.EDIT_TARGET_VIDEO,
			payload: video
		}
	}

}

export { VideoAction };
