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
		count: 0,
		location_active: false,
		content: locations[2]
	}


	render() {
		let { set_map, location_active, content } = this.props;
		console.log(content);
		return (
			<section>
				<MapComponent 
					content = { content } />
			
				<div className={s('player-wrapper')}>
					<Video 
						set_map = { set_map } 
						location_active = { location_active } 
						video_url = { content.video }
						add_content= { false }
						content= { content }/>	
				</div>
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		set_map: state.set_map,
		location_active: state.location_active
	}
}


export default connect(
	mapStateToProps,
	null
)(Index);
