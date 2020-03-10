import Type from './locations.types';

const LocationsAction = {

	fetchLocations: (res) => {
		return {
			type: Type.FETCH_LOCATIONS,
			payload: res
		}	
	}
}

export { LocationsAction };