import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { VideoAction } from 'redux-store/video/video.actions';
import { MapAction } from 'redux-store/map/map.actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

class VideoPlayer extends Component {

	activePin( location) {
		if(this.props.pin_id !== location.id) {
			this.props.setActivePin(location.id);
			this.props.map.flyTo({
				center: location.data.business.coordinates,
				zoom: 15
			});
			this.props.setCenterMap(location.data.business.coordinates);
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
			vlog_locations,
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
					// Adds video control throughout components
					setVideoControls(this.p);
				}}
				onProgress = { (e, f) => {

					let round_sec = Math.round(e.playedSeconds);
					if(vlog_locations) {
						let timestamps = vlog_locations.map(l => l.timestamp);
						vlog_locations.map((location, i) => {
							let video_duration = this.p.getDuration();
							let followup_time = (timestamps[i +1] ? timestamps[i+1] : video_duration)
							console.log(followup_time);
							if(round_sec >= location.timestamp && round_sec < followup_time) {
								console.log(location)
									// The pin in the center of the map is the active location
									this.activePin( location)
								}
						})

					}
					videoTime(round_sec);
				}}

				className={s('video-player')}/>
		)
	}
}


const mapStateToProps = state => {
	console.log(state)
	return {
		vlog_locations: state.locations.vlog_locations,
		playing: state.video.playing,
		video_url: state.video.video_url,
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