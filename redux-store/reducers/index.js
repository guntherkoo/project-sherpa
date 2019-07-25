import { Type } from '../actions';
import { combineReducers } from 'redux';
import MapReducer from './map_reducer';
import ContentReducer from './content_reducer';
import VideoReducer from './video_reducer';
import VlogReducer from './vlog_reducer';


// REDUCERS

const allReducers = combineReducers({
	map: MapReducer,
	content: ContentReducer,
	video: VideoReducer,
	vlogs: VlogReducer
})

export default allReducers;