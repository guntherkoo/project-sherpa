import { connect } from 'react-redux';

import { VideoAction } from 'redux-store/video/video.actions';

import s from '../TimestampLocations.scss';

const Location = ({ vlog_location, video_player, playVideo, map, pin_id }) => {
	return(
		<div className={s("Location", (pin_id === vlog_location.id ? 'active' : ''))}>
			<a onClick={(()=>{
				map.flyTo({
					center: vlog_location.data.business.coordinates,
					zoom: 15,
				});	
				video_player.seekTo(vlog_location.timestamp);
				playVideo();
			})}>
				
				<h1>{vlog_location.data.business.business_name}</h1>
			</a>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	playVideo: () => dispatch(VideoAction.playVideo())
})

const mapStateToProps = state => {
	return {
		map : state.map.set_map,
		video_player: state.video.player,
		pin_id : state.map.pin_id
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);