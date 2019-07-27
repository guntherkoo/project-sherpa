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
		add_content: false
	}


	render() {
		let { 
			map, 
			content, 
			vlogs,
			add_content } = this.props;

		return (
			<section>
				<MapComponent 
					vlogs = { vlogs } 
					map = { map } 
					center = { vlogs.coordinates }/>
			
				<div className={s('player-wrapper')}>
					<Video 
						map = { map } 
						video_url = { vlogs.video }
						add_content= { add_content }
						vlogs= { vlogs }/>	
				</div>
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map.set_map,
		vlogs: state.vlogs[2]
	}
}


export default connect(
	mapStateToProps,
	null
)(Index);
