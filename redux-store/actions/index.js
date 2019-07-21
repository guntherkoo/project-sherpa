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
	FETCH_INPUT_LOCATION: 'FETCH_INPUT_LOCATION',
	FETCH_INPUT_LOCATION_SUCCESS: 'FETCH_INPUT_LOCATION_SUCCESS',
	CURRENT_CITY		: 'CURRENT_CITY',
	FETCH_BUSINESS_LOCATION_SUCCESS: 'FETCH_BUSINESS_LOCATION_SUCCESS'
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
	fetchInputLocation: (location) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place,neighborhood,region,locality&access_token=${process.env.MAPBOX_KEY}`

		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(Action.fetchInputLocationSuccess(json)))
		}
		
	},
	fetchInputLocationSuccess: (res) => {
		return {
			type: Type.FETCH_INPUT_LOCATION_SUCCESS,
			payload: res
		}	
	},
	getCurrentCity: (city) => {
		return {
			type: Type.CURRENT_CITY,
			payload: city
		}
	},
	createExperience: (experience) => {
		return {
			type: CREATE_EXPERIENCE,
			payload: experience
		}
	},
	fetchBusinessLocation: (business, bbox) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${business}.json?types=poi&bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&access_token=${process.env.MAPBOX_KEY}`

		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(Action.fetchBusinessLocationSuccess(json)))
		}
	},
	fetchBusinessLocationSuccess: (res) => {
		return {
			type: Type.FETCH_BUSINESS_LOCATION_SUCCESS,
			payload: res
		}	
	},

}

export { Type, Action };
