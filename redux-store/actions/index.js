// ACTIONS
const Type = {
	TOGGLE: 'TOGGLE',
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	PROGRESS : 'PROGRESS',
	COORD 	 : 'COORD',
	MAP   : 'MAP'
};

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},

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
	}
}

export { Type, Action };
