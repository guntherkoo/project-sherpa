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

	addToBusinesses() {
		let business = Object.assign({}, this.state.business)
		this.setState(prevState => ({
			businesses: this.state.businesses.concat(business)
		}))	
	}

	addBusinessesToExperience() {
		let businesses = [...this.state.businesses]
		this.setState(() => {
			let experience = Object.assign({}, this.state.experience)
			experience.locations = businesses
			return { experience }
		})
		let json = JSON.stringify(this.state.experience, null, 2);
		console.log(json)
	}

	render() {
		let { map, location_active, content } = this.props;
		let { progress_stage, experience, video_time, timestamp, business, businesses } = this.state;
		console.log(experience);
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
