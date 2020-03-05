import VloggersType from './vloggers.types';

const INIT_STATE = {}

const vloggersReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case VloggersType.FETCH_LIVE_VLOGGERS:
			return {
				...state,
				vloggers: action.payload
			}
		case VloggersType.FETCH_VLOGGER:
			return {
				...state,
				active_vlogger: action.payload
			}
		default:
			return state
	}
}

export default vloggersReducer;