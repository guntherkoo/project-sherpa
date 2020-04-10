import s from '../Vlogger.scss';
import { Link } from '../../../routes.js';
import { connect } from 'react-redux';

import { VideoAction } from 'redux-store/video/video.actions';
import { LocationsAction } from 'redux-store/locations/locations.actions';



const Vlogs = ({ vlog, vlogger, setVideoUrl, all_locations, vlogLocations, city }) => {
	if(!all_locations) return false;
	let { title, url, locations } = vlog.data
	console.log(locations);
	return(
		<div className={s('Vlogs')}>
			<Link href={{ pathname: '/', query: { city: city, vlogger: vlogger, vlog: vlog.id } }}>
				<a>
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