import React from 'react';
import initializeStore from 'redux-store/makeStore';

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore (initial_state) {
	// Always make a new store if server, otherwise state is shared between requests
	if (isServer) {
		return initializeStore(initial_state)
	}

	// Create store if unavailable on the client and set it on the window object
	if (!window[__NEXT_REDUX_STORE__]) {
		window[__NEXT_REDUX_STORE__] = initializeStore(initial_state)
	}
	return window[__NEXT_REDUX_STORE__]
}

export default App => {
	return class AppWithRedux extends React.Component {
		static async getInitialProps (appContext) {
			// Get or Create the store with `undefined` as initial_state
			// This allows you to set a custom default initial_state
			const reduxStore = getOrCreateStore()

			// Provide the store to getInitialProps of pages
			appContext.ctx.reduxStore = reduxStore

			let appProps = {}
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext)
			}

			return {
				...appProps,
				initial_state: reduxStore.getState()
			}
		}

		constructor (props) {
			super(props)
			this.reduxStore = getOrCreateStore(props.initial_state)
		}

		render () {
			return <App {...this.props} reduxStore={this.reduxStore} />
		}
	}
}
