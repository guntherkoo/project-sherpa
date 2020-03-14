import { Type } from '../actions';
import { combineReducers } from 'redux';
import mapReducer from '../map/map.reducer';
import ContentReducer from './content_reducer';

import VlogReducer from './vlog_reducer';
import BusinessesReducer from './businesses_reducer';
import geocoderReducer from '../geocoder/geocoder.reducer';
import vloggersReducer from '../vloggers/vloggers.reducer';
import locationsReducer from '../locations/locations.reducer';
import videoReducer from '../video/video.reducer';


// REDUCERS

const allReducers = combineReducers({
	map: mapReducer,
	content: ContentReducer,
	vlogs: VlogReducer,
	video: videoReducer,
	businesses: BusinessesReducer,
	geocoder: geocoderReducer,
	vloggers: vloggersReducer,
	locations: locationsReducer
})

export default allReducers;