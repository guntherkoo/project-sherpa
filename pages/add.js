// Packages
import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import GlobalStyles from 'styles/styles.scss';
import Head from './_head';

// Components
import Video from '../components/VideoPlayer';
import AddForm from '../components/AddForm';
import ExperienceBuilder from '../components/ExperienceBuilder';
const MapComponent = dynamic( () =>
	import('../components/MapComponent'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)


class Add extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req
		console.log(req.url, "hey")
		return {
			param: req.url
		}
	}

	state = {
		vlog: null,
	}


	render() {
		let { map, content, video_time, param } = this.props;
		let { vlog, timestamp, business, businesses } = this.state;
		return (
			<section>
				<Head title={"Add Experience"}></Head>
				<MapComponent 
					param = { param }/>
				<AddForm 
					map = { map } 
					experience = { vlog }
					/>
				<ExperienceBuilder />
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		content: state.content,
		video: state.video,
		video_time: state.video.video_time,
	}
}


export default connect(
	mapStateToProps,
	null
)(Add);
