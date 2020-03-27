import { connect } from 'react-redux';

import s from './TimestampLocations.scss';
import Location from './helpers/Location';

import { VideoAction } from 'redux-store/video/video.actions';


const TimestampLocations = ({ vlog_locations, allVlogs, current_vlog, setVideoUrl }) => {
	if(!vlog_locations) return false;
	console.log(allVlogs, current_vlog);
	let vlog_url = allVlogs.find(vlog => vlog.id === current_vlog);
	setVideoUrl(vlog_url.data.url);
	return(
		<div className={s('TimestampLocations')}>
			{ vlog_locations.map((location) => {
				return(
					<Location 
						key = {location.id}
						vlog_location = { location }/>
				)
			})}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		vlog_locations: state.locations.vlog_locations
	}
}

const mapDispatchToProps = dispatch => ({
	setVideoUrl: (url) => dispatch(VideoAction.setVideoUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimestampLocations);