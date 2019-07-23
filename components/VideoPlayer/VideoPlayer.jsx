import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

class VideoPlayer extends Component {
	state = {
		location_id : 0
	}

	activePin({ location_id }, location, { setActivePin, map, }) {
		if(location_id !== location.id) {
			console.log(location_id, location.id)
			this.setState({
				location_id : location.id
			})
			setActivePin(location, map);
			map.flyTo({
				center: location.coordinates,
				zoom: 15
			})
		}
	}

	render() {
		let { 
			map,
			playing, 
			setVideoControls, 
			setActivePin,
			video_url,
			add_content,
			updateVideoTime,
			content
		} = this.props;

		let { 
			location_id 
		} = this.state;

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
				onProgress = { (e)=> {
					let round_sec = Math.round(e.playedSeconds);
					if(!add_content)
						// This is for pages with established content
						content.locations.map(location => {
							if(round_sec >= location.time_start && round_sec < location.time_end) {
								// The pin in the center of the map is the active location
									this.activePin(this.state, location, this.props)
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
	return {
		playing: state.playing
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setActivePin(location) {
			dispatch(Action.setActivePin(location));
		},
		setVideoControls(player) {
			dispatch(Action.setVideoControls(player));
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoPlayer);