import { Type } from '../actions';
import { combineReducers } from 'redux';
import MapReducer from '../map/map.reducer';
import ContentReducer from './content_reducer';
import VideoReducer from './video_reducer';
import VlogReducer from './vlog_reducer';
import BusinessesReducer from './businesses_reducer';
import geocoderReducer from '../geocoder/geocoder.reducer';
import vloggersReducer from '../vloggers/vloggers.reducer';
import locationsReducer from '../locations/locations.reducer';


// REDUCERS

const allReducers = combineReducers({
	map: MapReducer,
	content: ContentReducer,
	video: VideoReducer,
	vlogs: VlogReducer,
	businesses: BusinessesReducer,
	geocoder: geocoderReducer,
	vloggers: vloggersReducer,
	locations: locationsReducer
})

export default allReducers;