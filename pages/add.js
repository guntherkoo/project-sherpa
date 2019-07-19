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



class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	static defaultProps = {
		content: null,
		location_active: false
	}


	render() {
		let { map, progress, location_active } = this.props;
		console.log(location_active)
		return (
			<section>
				<MapComponent />	
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
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
