// Packages
import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';

// Styles
import GlobalStyles from 'styles/styles.scss';
import Head from './_head';

// Components
import LocationDetails from '../components/LocationDetails';
const Map = dynamic( () =>
	import('../components/Map'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)


class Businesses extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req
		console.log(req.url, "hey")
		return {
			param: req.url
		}
	}

	render() {
		let { map, content, video_time, param } = this.props;
		return (
			<section>
				<Head title={"Businesses"}></Head>
				<Map />
				<LocationDetails />
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		map: state.map,
		content: state.content,
		video: state.video
	}
}


export default connect(
	mapStateToProps,
	null
)(Businesses);
