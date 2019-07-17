// ACTIONS
const Type = {
	PROGRESS 		: 'PROGRESS',
	COORD 	 		: 'COORD',
	MAP   	 		: 'MAP',
	ACTIVE_LOCATION : 'ACTIVE_LOCATION',
	VIDEO_CONTROLS 	: 'VIDEO_CONTROLS',
	VIDEO_PLAY		: 'VIDEO_PLAY'
};

const Action = {

	incrementCount: () => {
		return { type: Type.INCREMENT }
	},

	decrementCount: () => {
		return { type: Type.DECREMENT }
	},
	trackVideoProgress: (time) => {
		return { 
			type: Type.PROGRESS,
			payload : time
		}
	},
	setMapToProps: (map) => {
		return {
			type: Type.MAP,
			payload: map
		}
	},
	setActiveLocation: (location) => {
		return {
			type: Type.ACTIVE_LOCATION,
			payload: location
		}
	},
	setVideoControls: (player) => {
		return {
			type: Type.VIDEO_CONTROLS,
			payload: player
		}
	},
	playVideo: () => {
		return {
			type: Type.VIDEO_PLAY
		}
	}

}

export { Type, Action };
