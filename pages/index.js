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

import s from '../styles/_index.scss';


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
		let { map, location_active, content } = this.props;
		return (
			<section>
				<MapComponent 
					content = { content } />
			
				<div className={s('player-wrapper')}>
					<Video 
						map = { map } 
						location_active = { location_active } 
						video_url = { locations[0].video }
						add_content= { false } />	
				</div>
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		location_active: state.location_active
	}
}

const mapDispatchToProps = dispatch => {
	return {
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
