import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './VlogContainer.scss';
import Video from '../VideoPlayer';

class VlogContainer extends Component {


	static defaultProps = {
	}

	render() {

		let { 
			vlogs,
			map,
			add_content,
			playVideo,
			video
		} = this.props;
		console.log(this.props.vlogs)
		return(
			<div className = {s('vlog_container')}>
				<div className={s('vlog_container-video')}>
					<Video 
						map = { map }
						add_content = { add_content }
						video_url = { vlogs.video } 
						vlogs = { vlogs }/>
				</div>
				<div className={s('vlog_container-vlogger')}>
					<h1>{vlogs.name}</h1>
				</div>
				<div className={s('vlog_container-locations')}>
					{ vlogs.locations.map((location,i) => {
						return(
							<div 
								className={s('location_details')}
								key={i}
								onClick={ (e)=>{
									playVideo()
									video.seekTo(location.time_start);
									map.flyTo({ center: location.coordinates,zoom: 15 });
								}}>
								<h3>{location.name}</h3>
							</div>
						)
					})}
				</div>
			</div>

		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return {
		map: state.map.set_map,
		video: state.video.player
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
)(VlogContainer);