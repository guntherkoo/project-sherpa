import { Type } from '../actions';
import { combineReducers } from 'redux';
import MapReducer from './map_reducer';
import ContentReducer from './content_reducer';
import VideoReducer from './video_reducer'

const handleFetchInputLocationSuccess = (state, action) => {
	return {
		...state,
		content_location: action.payload
	}
}

// REDUCERS

const allReducers = combineReducers({
	map: MapReducer,
	content: ContentReducer,
	video: VideoReducer
})

export default allReducers;