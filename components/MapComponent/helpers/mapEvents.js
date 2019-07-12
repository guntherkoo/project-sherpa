export function progressToLocation(map, coord, zoom) {
	map.flyTo({
		center: coord,
		zoom: zoom
	})
}

