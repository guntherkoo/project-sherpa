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
		tap: false,
		count: 0,
		progress: 0
	}

	// return createStore(
	// 	reducer,
	// 	initial_state,
	// 	composeWithDevTools(applyMiddleware(apiMiddleware))
	// )

	const store = createStoreWithMiddleware(reducer, initial_state);

	return store;
}