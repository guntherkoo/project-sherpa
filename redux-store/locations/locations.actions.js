import Type from './locations.types';

const LocationsAction = {

	fetchLocations: (res) => {
		return {
			type: Type.FETCH_LOCATIONS,
			payload: res
		}	
	},
	vlogLocations: (loc) => {
		return {
			type: Type.VLOG_LOCATIONS,
			payload: loc
		}
	}
}

export { LocationsAction };