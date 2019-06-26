// ACTIONS
const Type = {
	TOGGLE: 'TOGGLE',
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT'
}

const Action = {
	toggleTap: () => {
		return { type: Type.TOGGLE }
	},

	incrementCount: () => {
		return { type: Type.INCREMENT }
	},

	decrementCount: () => {
		return { type: Type.DECREMENT }
	}
}

export { Type, Action };
