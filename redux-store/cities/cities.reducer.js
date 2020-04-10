import Type from './cities.types';

const INIT_STATE = {
	cities: null
}

const citiesReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case Type.FETCH_CITIES:
			return {
				...state,
				cities: action.payload
			}
		default:
			return state
	}
}

export default citiesReducer;