import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

class VideoPlayer extends Component {
	state = {
		location_active	: false,
		location_id 	: 0
	}

	render() {
		if(!this.props.map) return <div></div>
		return(
			<div className={s("player-wrapper")}>

				<ReactPlayer 
					url={locations[0].video} 
					playing = { false } 
					width='50%' 
					height='50%'
					controls= { true }
					onProgress = { (e)=> {
						let round_sec = Math.round(e.playedSeconds);
						this.props.trackVideoProgress(round_sec);
						console.log(this.state.location_id);
						locations[0].locations.map(location => {
							if(round_sec >= location.time_start && round_sec < location.time_end) {
								if(this.state.location_id !== location.id) {
									this.setState({
										location_id : location.id
									})
									this.props.setActiveLocation(location);
									this.props.map.flyTo({
										center: location.coordinates,
										zoom: 19
									})
								}
								
							}
							
							
						})

					}}
					className={s('VideoPlayer')}/>
			</div>
		)
	}

	
}


const mapDispatchToProps = dispatch => {
	return {
		trackVideoProgress(time) {
			dispatch(Action.trackVideoProgress(time));
		},
		toggleLocationActive(time) {
			dispatch(Action.toggleLocationActive(time));
		},
		setActiveLocation(location) {
			dispatch(Action.setActiveLocation(location));
		}
	}
}
export default connect(
	null,
	mapDispatchToProps
)(VideoPlayer);