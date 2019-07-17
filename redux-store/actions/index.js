// ACTIONS
const Type = {
	PROGRESS 		: 'PROGRESS',
	COORD 	 		: 'COORD',
	MAP   	 		: 'MAP',
	ACTIVE_LOCATION : 'ACTIVE_LOCATION'
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
	}

}

export { Type, Action };
