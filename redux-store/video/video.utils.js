export const updateVideo = (video, videoUpdate) => {
	return { ...video, ...videoUpdate }
}

export const addPin = (pins, pinsToAdd) => {
	let currentPins = [...pins];
	return [...pins, { currentPins, locations: pinsToAdd }]
}
