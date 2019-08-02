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

		return {}
	}

	state = {
		vlog: null,
		business: {
			id 			: 0,
			coordinates	: '',
			name 		: '',
			time_start 	: '',
			time_end 	: ''
		},
		businesses: [],
		progress_stage: 1,
		video_time: 0,
	}

	static defaultProps = {
		content: false,
		location_active: false
	}

	updateVlog(vlog) {
		if(this.state.vlog === null) {
			this.setState({ 
				vlog: vlog,
				progress_stage: 2
			})
		} else {
			this.setState(() => {
	 			let newExperience = Object.assign(this.state.vlog, vlog);
	 			return newExperience
			})
		}
	}
	updateBusiness(business) {
		if(this.state.business === null) {
			this.setState({ 
				business: business
			})
		} else {
			this.setState(() => {
	 			let newExperience = Object.assign(this.state.business, business);
	 			return newExperience
			})
		}
	}

	updateVideoTime(sec) {
		this.setState({
			video_time : sec
		})
	}

	addToBusinesses() {
		let business = Object.assign({}, this.state.business)
		this.setState(prevState => ({
			businesses: this.state.businesses.concat(business)
		}))	
	}

	addBusinessesToExperience() {
		let businesses = [...this.state.businesses]
		this.setState(() => {
			let vlog = Object.assign({}, this.state.vlog)
			vlog.locations = businesses
			return { vlog }
		})
		let json = JSON.stringify(this.state.vlog, null, 2);
	}

	render() {
		let { map, location_active, content } = this.props;
		let { progress_stage, vlog, video_time, timestamp, business, businesses } = this.state;
		console.log(this.props)
		return (
			<section>
				<Head title={"Add Experience"}></Head>
				<MapComponent 
					updateExperience = { this.updateVlog.bind(this) }
					progress_stage= { progress_stage } 
					business = { business }
					/>
				<AddForm 
					map = { map }
					location_active = { location_active }
					updateExperience = { this.updateVlog.bind(this) }
					progress_stage= { progress_stage } 
					experience = { vlog } 
					updateVideoTime = { this.updateVideoTime.bind(this) }
					video_time = { video_time }
					updateBusiness = { this.updateBusiness.bind(this) }
					business = { business }
					addToBusinesses = { this.addToBusinesses.bind(this) }
					addBusinessesToExperience = { this.addBusinessesToExperience.bind(this) }
					/>
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
)(Add);
