import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import GlobalStyles from 'styles/styles.scss';

const MapComponent = dynamic(() =>
	import('../components/MapComponent'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)
import Video from '../components/VideoPlayer';
import locations from '../components/dummy_data/locations.json';

import s from '../styles/_index.scss';


class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	static defaultProps = {
		location_active: false,
		content: locations[2]
	}


	render() {
		let { map, location_active, content, vlogs } = this.props;

		return (
			<section>
				<MapComponent 
					content = { vlogs[2] } />
			
				<div className={s('player-wrapper')}>
					<Video 
						set_map = { map.set_map } 
						location_active = { location_active } 
						video_url = { vlogs[2].video }
						add_content= { false }
						content= { content }/>	
				</div>
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		vlogs: state.vlogs,
		video: state.video
	}
}


export default connect(
	mapStateToProps,
	null
)(Index);
