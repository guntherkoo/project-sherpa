import { 
	createStore,
	applyMiddleware,
	combineReducers 
} from 'redux';

import 'isomorphic-unfetch';
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware';
import promiseMiddleware from './middlewares/promiseMiddlewares';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers';

export default function initializeStore(initial_state = {}) {

	const middlewares = [thunk, promiseMiddleware, apiMiddleware];

	const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(...middlewares))(createStore);

	initial_state = {
		// progress: 0,
		// location: {
		// 	id:0
		// },
		// playing: false,
		// content: null
	}

	const store = createStoreWithMiddleware(reducer, initial_state);

	return store;
}