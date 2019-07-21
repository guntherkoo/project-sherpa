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
import AddForm from '../components/AddForm';


class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	state = {
		experience: null,
		business: {
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

	updateExperience(experience) {
		if(this.state.experience === null) {
			this.setState({ 
				experience: experience,
				progress_stage: 2
			})
		} else {
			this.setState(() => {
	 			let newExperience = Object.assign(this.state.experience, experience);
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


	render() {
		let { map, location_active, content } = this.props;
		let { progress_stage, experience, video_time, timestamp, business } = this.state;
		return (
			<section>
				<MapComponent 
					updateExperience = { this.updateExperience.bind(this) }
					progress_stage= { progress_stage } 
					business = { business }
					/>
				<AddForm 
					map = { map }
					location_active = { location_active }
					updateExperience = { this.updateExperience.bind(this) }
					progress_stage= { progress_stage } 
					experience = { experience } 
					updateVideoTime = { this.updateVideoTime.bind(this) }
					video_time = { video_time }
					updateBusiness = { this.updateBusiness.bind(this) }
					business = { business }
					/>
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
	
}
export default connect(
	mapStateToProps,
	null
)(Index);
