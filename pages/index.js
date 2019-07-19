import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import GlobalStyles from 'styles/styles.scss';

const MapComponent = dynamic(()=>
	import('../components/MapComponent'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)
import Video from '../components/VideoPlayer';
import locations from '../components/dummy_data/locations.json';



class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	static defaultProps = {
		count: 0,
		location_active: false,
		content: locations[0]
	}


	render() {
		let { map, progress, location_active, content } = this.props;
		console.log(this.props)
		return (
			<section>
				<MapComponent 
					content = { content } />
			
				<Video 
					map = { map } 
					location_active = { location_active } />	
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		progress: state.progress,
		location_active: state.location_active
	}
}

const mapDispatchToProps = dispatch => {
	return {
		trackVideoProgress(time) {
			dispatch(Action.trackVideoProgress(time));
		},
		setMapToProps(map) {
			dispatch(Action.setMapToProps(map));
		},
		setContent(content) {
			dispatch(Action.setContent(content));	
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
