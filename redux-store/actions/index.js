import fetch from 'cross-fetch';

// ACTIONS
const Type = {
	MAP   	 			: 'MAP',
	ACTIVE_PIN 			: 'ACTIVE_PIN',
	PROGRESS 			: 'PROGRESS',
	COORD 	 			: 'COORD',
	VIDEO_CONTROLS 		: 'VIDEO_CONTROLS',
	VIDEO_PLAY			: 'VIDEO_PLAY',
	CONTENT 			: 'CONTENT',
	FETCH_CONTENT_LOCATION: 'FETCH_CONTENT_LOCATION',
	FETCH_CONTENT_LOCATION_SUCCESS: 'FETCH_CONTENT_LOCATION_SUCCESS',
	CURRENT_CITY		: 'CURRENT_CITY'
};

const Action = {
	// Map Actions
		// adds map functionality across components
	setMapToProps: (map) => {
		return {
			type: Type.MAP,
			payload: map
		}
	},
	setActivePin: (location, map) => {
		return {
			type: Type.ACTIVE_PIN,
			payload: location
		}
	},
	// Video Actions
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
	},
	getCurrentCity: (city) => {
		return {
			type: Type.CURRENT_CITY,
			payload: city
		}
	}

}

export { Type, Action };
