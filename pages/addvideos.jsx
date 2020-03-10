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


class AddVideos extends Component {
	static getInitialProps = async ({ query }) => {
		const collectionRef = await firestore.collection('locations').get();
		const getLocations = collectionRef.docs.map(d => {
			return {
				id: d.id,
				data: d.data()
			}
		});

		return { 
			santa_fe : getLocations,
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

	handleSubmit = ({ text, center, place_type }, map) => {
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
		let { locations, map, business_input, fetchBusinessLocation, query } = this.props
		let { input } = this.state;

		return(
			<div>
				<Map locationPins = { locations }/>
				<VideoBuilder 
					map = { map }
					updateVideo = { this.updateVideo }
					business_input = { business_input }
					fetchBusinessLocation = { fetchBusinessLocation }
					locationPins = { locations }
					updateInput = { this.updateInput }
					handleSubmit = { this.handleSubmit }
					input = { input }
					/>
			</div>
		)
	}
} 


const mapStateToProps = state => {
	return {
		locations : state.locations.locations,
		map: state.map.set_map,
		business_input: state.geocoder.input_business
	}
}



const mapDispatchToProps = dispatch => ({
	fetchLocations: (loc) => dispatch(LocationsAction.fetchLocations(loc)),
	fetchInputLocation: (location, bbox) => dispatch(GeocodeAction.fetchInputLocation(location)),
	fetchBusinessLocation: (location, bbox) => dispatch(GeocodeAction.fetchBusinessLocation(location, bbox))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddVideos));