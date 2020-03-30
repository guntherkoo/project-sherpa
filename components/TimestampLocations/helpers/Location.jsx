import { connect } from 'react-redux';

import { VideoAction } from 'redux-store/video/video.actions';

import s from '../TimestampLocations.scss';
import { Link } from '../../../routes.js'

const Location = ({ vlog_location, video_player, playVideo, map }) => {
	return(
		<div className={s("Location")}>
			<a onClick={(()=>{
				console.log(map)
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
		video_player: state.video.player
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);