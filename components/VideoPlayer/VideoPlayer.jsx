import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './VideoPlayer.scss';
import locations from '../dummy_data/locations.json';

function VideoPlayer(props){
	if(!props.map) return <div></div>
	return(
		<ReactPlayer 
			url={'https://www.youtube.com/watch?v=sBLvzupw6BI'} 
			playing = { false } 
			width='30%' 
			height='30%'
			controls= { true }
			onProgress = { (e)=> {
				let round_sec = Math.round(e.playedSeconds);
				props.trackVideoProgress(round_sec);
				console.log(round_sec);
				locations.map(location => {
					if(round_sec >= location.time_start && round_sec <= location.time_end) {
						if(!props.location_active) {
							props.toggleLocationActive()
							props.map.flyTo({
								center: location.coordinates,
								zoom: 19
							})
						}
					}
				})

			}}
			className={s('VideoPlayer')}/>
	)
}


const mapDispatchToProps = dispatch => {
	return {
		trackVideoProgress(time) {
			dispatch(Action.trackVideoProgress(time));
		},
		toggleLocationActive(time) {
			dispatch(Action.toggleLocationActive(time));
		}
	}
}
export default connect(
	null,
	mapDispatchToProps
)(VideoPlayer);