import s from '../Vlogger.scss';
import { Link } from '../../../routes.js';
import { connect } from 'react-redux';

import { VideoAction } from 'redux-store/video/video.actions';
import { LocationsAction } from 'redux-store/locations/locations.actions';

let getPins = (arr1, arr2) => {

	let ids = new Set(arr2.map(d=> d.id));	
	let filter_loc = [...arr1.filter(d=> ids.has(d.id))].reverse();
	console.log(filter_loc);
	const newData = [...arr2.map((item, i) => {
	  return { 
	    ...item,
	    ...filter_loc[i]
	  };
	})];
	return newData
}

const Vlogs = ({ vlog, vlogger, setVideoUrl, all_locations, vlogLocations }) => {
	if(!all_locations) return false;
	let { title, url, locations } = vlog.data

	return(
		<div className={s('Vlogs')}>
			
			<Link href={{ pathname: '/', query: { vlogger: vlogger, vlog: vlog.id } }}>
				<a onClick={((e)=>{
					console.log(vlog, locations);
					let filterPins = getPins(all_locations, locations)
					vlogLocations(filterPins)
				})}>
					<div className={s("profile-pic")}
						style={{ backgroundImage: `url(https://via.placeholder.com/80)`}}></div>
					<h1>{title}</h1>
					</a>
	        </Link>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		all_locations: state.locations.locations
	}
}

const mapDispatchToProps = dispatch => ({
	setVideoUrl: (url) => dispatch(VideoAction.setVideoUrl(url)),
	vlogLocations: (loc) =>dispatch(LocationsAction.vlogLocations(loc))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vlogs);