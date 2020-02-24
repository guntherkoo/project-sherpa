import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import GlobalStyles from 'styles/styles.scss';
import Head from './_head';

const MapComponent = dynamic(() =>
	import('../components/MapComponent'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)
import Video from '../components/VideoPlayer';
import VlogContainer from '../components/VlogContainer';
import locations from '../components/dummy_data/locations.json';

import s from '../styles/_index.scss';


class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req
		return {
		}
	}

	static defaultProps = {
		add_content: false
	}


	render() {
		let { 
			map, 
			content, 
			vlogs,
			add_content,
			center } = this.props;

		return (
			<section>
				<Head title= {vlogs.name} />
				<MapComponent 
					vlogs = { vlogs } 
					map = { map }
					center = { center } />
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map.set_map,
		vlogs: state.vlogs[0],
		center: state.vlogs[0].coordinates
	}
}


export default connect(
	mapStateToProps,
	null
)(Index);
