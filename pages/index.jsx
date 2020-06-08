import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';
import { firestore, updateVloggerInfo } from '../lib/firebase';

import { VloggersAction } from '../redux-store/vloggers/vloggers.actions';
import { VideoAction } from '../redux-store/video/video.actions';
import { LocationsAction } from '../redux-store/locations/locations.actions';
import { CitiesAction } from '../redux-store/cities/cities.actions';
import { GeocodeAction } from 'redux-store/geocoder/geocoder.actions';

import GlobalStyles from 'styles/styles.scss';
import Head from './_head';
import s from '../styles/_index.scss';

import MapWrapper from '../components/MapWrapper';
import SidebarWrapper from '../components/SidebarWrapper';
import Vloggers from '../components/Vloggers';
import Vlogger from '../components/Vlogger';
import TimestampLocations from '../components/TimestampLocations';
import VideoPlayer from '../components/VideoPlayer';
import Cities from '../components/Cities';
const Map = dynamic(() =>
	import('../components/Map'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)



class Index extends Component {
	static getInitialProps = async({ reduxStore, req, query }) => {
		const isServer = !!req
		const collectionRef = await firestore.collection('videos').get();

		const getVlogs = collectionRef.docs.map(d => {
			return {
				id: d.id,
				data: d.data()
			}
		});
		return {
			query,
			getVlogs
		}
	}


	componentDidMount() {
		const snapshotRef = 
		firestore.collection('vloggers').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
			let vloggersSnapshot = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					data: doc.data()
				}	
			})
			this.props.fetchLiveVloggers(vloggersSnapshot)

		  }, (error) => {
		    console.log(error)
		  });

		const locationRef = 
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

	componentWillReceiveProps(nextProps) {
		if(!nextProps.map) return;

		if(!this.props.geocoder_location && nextProps.query.city) this.props.fetchInputLocation(this.props.query.city)

		if(nextProps.geocoder_location !== this.props.geocoder_location) {
			nextProps.map.flyTo({center: nextProps.geocoder_location.features[0].center, zoom : [12]})
		}
		
	}


	pinClick = (pin) => {

		this.props.video_player.seekTo(pin.timestamp);
		this.props.playVideo();
		this.props.map.flyTo({
			center: pin.data.business.coordinates,
			zoom: 15,
		});	
	}

	render() {
		let { 
			map, 
			content, 
			center,
			vloggers,
			query,
			getVlogs,
			vlog_locations,
			fetchCities,
			cities } = this.props;


		return (
			<section>
				<MapWrapper>
					<Map 
						locationPins = { (query.vlog ? vlog_locations : null) }
						pinClick = {this.pinClick}/>
				</MapWrapper>
				
				<SidebarWrapper>
					{query.vlog ? 
					 <VideoPlayer 
					 	map = { map } 
					 	video_url = {""} />
					 : <div></div>}

					
					
					<div className={s("sidebar-row")}>
						{!query.city ? 
							<Cities 
								fetchCities = { fetchCities }
								cities = { cities }/> :
								<div></div>}
						{!query.vlogger && query.city ? 
							<Vloggers 
								vloggers={ vloggers }
								vlogs = { getVlogs }
								city = { query.city }
								allVlogs= { getVlogs }/> :
							<div></div>
						}
						{ query.vlogger && !query.vlog ? 
							<Vlogger id = { query.vlogger }
								vloggers= { vloggers }
								allVlogs = { getVlogs }
								city = { query.city }/>:
							<div></div>
						}
						{ query.vlogger && query.vlog ? 
							<TimestampLocations 
								current_vlog = { query.vlog }
								allVlogs = { getVlogs }/> :
							<div></div>
						}
						

					</div>
					
				</SidebarWrapper>
				
				
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		vloggers: state.vloggers.vloggers,
		vlog_locations: state.locations.vlog_locations,
		video_player: state.video.player,
		map : state.map.set_map,
		cities: state.cities.cities,
		geocoder_location: state.geocoder.input_location
	}
}

const mapDispatchToProps = dispatch => ({
	fetchLiveVloggers: (vloggers) => dispatch(VloggersAction.fetchLiveVloggers(vloggers)),
	fetchVlogger: (vlogger) => dispatch(VloggersAction.fetchVlogger(vlogger)),
	fetchLocations: (loc) => dispatch(LocationsAction.fetchLocations(loc)),
	playVideo: () => dispatch(VideoAction.playVideo()),
	fetchCities: (city) => dispatch(CitiesAction.fetchCities(city)),
	fetchInputLocation: (url) => dispatch(GeocodeAction.fetchInputLocation(url))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
