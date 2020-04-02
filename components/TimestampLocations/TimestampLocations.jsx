import { connect } from 'react-redux';
import { Component } from 'react';

import s from './TimestampLocations.scss';
import Location from './helpers/Location';

import { VideoAction } from 'redux-store/video/video.actions';
import { LocationsAction } from 'redux-store/locations/locations.actions';


class TimestampLocations extends Component {

	getPins = (arr1, arr2) => {
		let merged = [];
		for(let i=0; i < arr2.length; i++) {
		  merged.push({
		   ...arr2[i], 
		   ...(arr1.find((itmInner) => itmInner.id === arr2[i].id))}
		  );
		}

		return merged	
	}

	render() {
		let { vlog_locations, all_locations, allVlogs, current_vlog, setVideoUrl, vloggers, vlogLocations } = this.props
		let active_vlog = allVlogs.find((vlog)=> vlog.id === current_vlog);
		let filterLocations = (all_locations ? this.getPins(all_locations, active_vlog.data.locations): null);
		// console.log(filterLocations, 'sheeet',vlog_locations)

		if(!vlog_locations || filterLocations[0].id !== vlog_locations[0].id) vlogLocations(filterLocations);
		setVideoUrl(active_vlog.data.url);	
		console.log(vlog_locations);		
		if(!vlog_locations) return <div></div>
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
	
}

const mapStateToProps = state => {
	console.log(state)
	return {
		vlog_locations: state.locations.vlog_locations,
		all_locations: state.locations.locations,
		vloggers: state.vloggers.vloggers
	}
}

const mapDispatchToProps = dispatch => ({
	setVideoUrl: (url) => dispatch(VideoAction.setVideoUrl(url)),
	vlogLocations: (loc) =>dispatch(LocationsAction.vlogLocations(loc))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimestampLocations);