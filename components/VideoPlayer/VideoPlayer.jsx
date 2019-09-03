import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

class VideoPlayer extends Component {

	activePin( location, { map, setActivePin, pin_id, playVideo }) {
		console.log(pin_id, location.id, "before")
		if(pin_id !== location.id) {
			setActivePin(location.id);
			console.log(pin_id, location.id, "after")
			map.flyTo({
				center: location.coordinates,
				zoom: 15,
				offset: [100, 0]
			});
		}
	}

	static defaultProps = {
		pin_id: 0,
		playing: false
	}

	render() {

		let { 
			map,
			playing, 
			setVideoControls, 
			video_url,
			add_content,
			updateVideoTime,
			vlogs,
			pin_id
		} = this.props;
		console.log(this.props.vlogs)

		if(!map) return <div></div>
		return(


			<ReactPlayer 
				url={ video_url } 
				ref = {p => {this.p = p}}
				playing = { playing }
				width='100%' 
				height='100%'
				controls= { true }
				onReady = { () => {
					// Adds video control throughout components
					setVideoControls(this.p);
				}}
				onProgress = { (e) => {
					let round_sec = Math.round(e.playedSeconds);
					console.log(playing)
					if(!add_content)
						// This is for pages with established content
						vlogs.locations.map(location => {
							if(round_sec >= location.time_start && round_sec < location.time_end) {
								// The pin in the center of the map is the active location
									this.activePin( location, this.props)
							}	
					})

					if(add_content) {
						// Insert actions for adding content here 
						updateVideoTime(round_sec);
					}
				}}

				className={s('video-player')}/>
		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return {
		playing: state.video.playing,
		pin_id: state.map.pin_id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setVideoControls(player) {
			dispatch(Action.setVideoControls(player))
		},
		setActivePin(pin) {
			dispatch(Action.setActivePin(pin))
		},
		playVideo() {
			dispatch(Action.playVideo())
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoPlayer);