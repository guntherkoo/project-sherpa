import Type from './cities.types';

const CitiesAction = {

	fetchCities: (res) => {
		return {
			type: Type.FETCH_CITIES,
			payload: res
		}	
	}
}

export { CitiesAction };