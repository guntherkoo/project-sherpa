import fetch from 'cross-fetch';

// ACTIONS
const Type = {
	PROGRESS 			: 'PROGRESS',
	COORD 	 			: 'COORD',
	MAP   	 			: 'MAP',
	ACTIVE_LOCATION 	: 'ACTIVE_LOCATION',
	VIDEO_CONTROLS 		: 'VIDEO_CONTROLS',
	VIDEO_PLAY			: 'VIDEO_PLAY',
	CONTENT 			: 'CONTENT',
	FETCH_CONTENT_LOCATION: 'FETCH_CONTENT_LOCATION',
	FETCH_CONTENT_LOCATION_SUCCESS: 'FETCH_CONTENT_LOCATION_SUCCESS'
};

const Action = {
	// Map Actions
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
	// Video Actions
	trackVideoProgress: (time) => {
		return { 
			type: Type.PROGRESS,
			payload : time
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
	},
	// Content Actions
	setContent: (content) => {
		return { 
			type: Type.CONTENT,
			payload: content
		}
	},
	fetchContentLocation: (location) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place&access_token=${process.env.MAPBOX_KEY}`

		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(Action.fetchContentLocationSuccess(json)))
		}
		
	},
	fetchContentLocationSuccess: (res) => {
		return {
			type: Type.FETCH_CONTENT_LOCATION_SUCCESS,
			payload: res
		}
		
		
	}

}

export { Type, Action };
