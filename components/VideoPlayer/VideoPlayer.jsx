import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { VideoAction } from 'redux-store/video/video.actions';
import { MapAction } from 'redux-store/video/video.actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

class VideoPlayer extends Component {

	activePin( location, { map, setActivePin, pin_id, playVideo, setCenterMap }) {
		if(pin_id !== location.id) {
			setActivePin(location.id);
			map.flyTo({
				center: location.coordinates,
				zoom: 15,
				offset: [100, 0]
			});
			setCenterMap(location.coordinates);
		}
	}

	static defaultProps = {
		pin_id: 0,
		playing: false
	}

	render() {

		let {
			// mapstatetoprops
			map,
			playing, 
			pin_id,
			// mapdispatchtoprops
			setVideoControls, 
			videoTime,
			// passed down props
			video_url,
			add_content,
			vlogs,
		} = this.props;
		return(
			<ReactPlayer 
				url={ video_url } 
				ref = {p => {this.p = p}}
				playing = { playing }
				width='100%' 
				height='0'
				controls= { true }
				onReady = { () => {
					console.log(this.p)
					// Adds video control throughout components
					setVideoControls(this.p);
				}}
				onProgress = { (e) => {
					let round_sec = Math.round(e.playedSeconds);
					// if(!add_content)
					// 	// This is for pages with established content
					// 	vlogs.locations.map(location => {
					// 		if(round_sec >= location.time_start && round_sec < location.time_end) {
					// 			// The pin in the center of the map is the active location
					// 				this.activePin( location, this.props)
					// 		}	
					// })

					// if(add_content) {
						// Insert actions for adding content here 
						videoTime(round_sec);
					// }
				}}

				className={s('video-player')}/>
		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return {
		playing: state.video.playing,
		video_url: state.video.video_data.url,
		pin_id: state.map.pin_id,
		map: state.map.set_map
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setVideoControls(player) {
			dispatch(VideoAction.setVideoControls(player))
		},
		setActivePin(pin) {
			dispatch(MapAction.setActivePin(pin))
		},
		setCenterMap(center) {
			dispatch(MapAction.setCenterMap(center))
		},
		playVideo() {
			dispatch(VideoAction.playVideo())
		},
		videoTime(time) {
			dispatch(VideoAction.videoTime(time))
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoPlayer);