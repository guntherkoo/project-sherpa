import { Component } from 'react';
import dynamic from 'next/dynamic';
import Router, { withRouter }  from 'next/router';

import { connect } from 'react-redux';
import { firestore } from '../lib/firebase';

import GlobalStyles from 'styles/styles.scss';

import VideoBuilder from '../components/VideoBuilder';

const Map = dynamic( () => import('../components/Map'),{ loading: () => <div></div>, ssr:false})
import { GeocodeAction } from '../redux-store/geocoder/geocoder.actions';
import { LocationsAction } from '../redux-store/locations/locations.actions';
import { VideoAction } from '../redux-store/video/video.actions';


class AddVideos extends Component {
	static getInitialProps = async ({ query }) => {
		return { 
			query 
		}
	}

	initialState = { 
		video_builder: {
			title: '',
			additional_info: ''
		},
		video_update: {
			id: '',
			title: '',
			locations: [],
			additional_info: ''
		},
		input: ''
	}
	state = this.initialState;
	
	updateInput = inp => {
		this.setState({
			input: inp
		})
		
	}


	clearState = () => {
		this.updateVideo(this.initialState.video_builder)
		this.setState(this.initialState)
	}

	buildVideo = ( newState ) => {
		this.setState(prevState => ({
			video_builder: {...prevState.video_builder, ...newState}
		}))
	}

	updateVideo = ( id, newState ) => {
		this.setState(prevState => ({
			video_update: {...prevState.video_update, ...newState}
		}))	
	}

	resetState = () => {
		this.setState({ video_update: this.initialState })
	}

	pinClick = (pin) => {
		let currentPins = [...this.props.video_data.locations]
		let updatePins = [ ...currentPins ,{ id: pin.id, timestamp: this.props.video_time }]
		this.props.setVideoData({locations: updatePins});
	}

	handleSubmit = ({ text, center, place_type }, map) => {
		// setVideoData({location: input_value});
		map.jumpTo({center, zoom: (place_type[0] === "poi" ? 15: 12)});
		Router.push({ pathname:'/addvideos', query: {name: text, lng: center[0], lat: center[1]}})
	}

	componentDidMount() {
		const snapshotRef = 
			firestore.collection('locations').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
				let locationsSnapshot = snapshot.docs.map(doc => {
					return {
						id: doc.id,
						data: doc.data()
					}	
				})
				this.props.fetchLocations(locationsSnapshot)

			  }, (error) => {
			    console.log(error)
			  });
	}

	render() {
		let { locations, map, geolocation, business_input, fetchBusinessLocation, query, setVideoData, video_data, video_player, updateGeolocation, hover_marker } = this.props
		let { input } = this.state;
		return(
			<div>
				<Map 
					locationPins = { locations }
					pinClick = { this.pinClick }
					hover_marker= { hover_marker }/>
				<VideoBuilder 
					map = { map }
					updateVideo = { this.updateVideo }
					business_input = { business_input }
					fetchBusinessLocation = { fetchBusinessLocation }
					locationPins = { locations }
					updateInput = { this.updateInput }
					handleSubmit = { this.handleSubmit }
					input = { input }
					setVideoData = { setVideoData }
					video_data = { video_data }
					video_player = { video_player }
					geolocation = { geolocation }
					updateGeolocation = { updateGeolocation }
					/>
			</div>
		)
	}
} 


const mapStateToProps = state => {
	// console.log(state.video);
	return {
		locations : state.locations.locations,
		map: state.map.set_map,
		business_input: state.geocoder.input_business,
		video_data: state.video.video_data,
		video_time: state.video.video_time,
		geolocation: state.geocoder.geolocation,
		hover_marker: state.map.hover_id
	}
}



const mapDispatchToProps = dispatch => ({
	fetchLocations: (loc) => dispatch(LocationsAction.fetchLocations(loc)),
	fetchInputLocation: (location, bbox) => dispatch(GeocodeAction.fetchInputLocation(location)),
	fetchBusinessLocation: (location, bbox) => dispatch(GeocodeAction.fetchBusinessLocation(location, bbox)),
	setVideoData: (info) => dispatch(VideoAction.setVideoData(info)),
	updateGeolocation: (loc) => dispatch(GeocodeAction.updateGeolocation(loc)),
	addVideoPinClick: (pin) => dispatch(VideoAction.addVideoPinClick(pin))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddVideos));