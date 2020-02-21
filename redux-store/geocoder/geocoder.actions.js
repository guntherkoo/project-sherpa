import Type from './geocoder.types';

const GeocodeAction = {

	fetchInputLocation: (location) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place,neighborhood,locality&access_token=${process.env.MAPBOX_KEY}`
		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(GeocodeAction.fetchInputLocationSuccess(json)))
		}
		
	},
	fetchInputLocationSuccess: (res) => {
		return {
			type: Type.FETCH_INPUT_LOCATION_SUCCESS,
			payload: res
		}	
	},


	fetchBusinessLocation: (business, bbox) => {
		console.log(business, bbox)
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${business}.json?types=poi&bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&access_token=${process.env.MAPBOX_KEY}`
		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(GeocodeAction.fetchBusinessLocationSuccess(json)))
		}
	},
	fetchBusinessLocationSuccess: (res) => {
		return {
			type: Type.FETCH_BUSINESS_LOCATION_SUCCESS,
			payload: res
		}	
	}
	

}

export { GeocodeAction };