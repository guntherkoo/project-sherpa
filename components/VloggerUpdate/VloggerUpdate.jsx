import { Component } from 'react';

import { firestore, removeVlogger } from '../../lib/firebase';
import { connect } from 'react-redux';

import s from './VloggerUpdate.scss';
import TextInput from '../TextInput';
import AddVideo from './helpers/add_videos';


class VloggerUpdate extends Component {

	pinClick = (pin) => {
		let currentPins = [...this.props.video_data.locations]
		let updatePins = [ ...currentPins ,{ id: pin.id, timestamp: this.props.video_time }]
		this.props.setVideoData({locations: updatePins});
	}
	
	updateVideos =(video, id)=> {
		let currentVideos = [...this.props.vlogger_update.vlogs]
		let updateVideo = [ ...currentVideos, { v_id: video.id, city: video.data.city }]
		this.props.updateVlogger(id, { vlogs: updateVideo })
	}

	render() {

		if(!this.props.active_vlogger) return <div className={s('vlogger-update')}>Choose a Vlogger to edit</div>;

		let { fetchVlogger, updateVlogger, active_vlogger, current_videos, vloggers } = this.props;
		let { additional_info, name, profile_img, vlogs, id } = this.props.vlogger_update;
		let vlogger_vid = vloggers.map(vlogger => {
			return vlogger.data.vlogs.map(vlog => vlog);
		})
		var merged = [].concat.apply([], vlogger_vid);
			
		const unclaimed_vlogs = current_videos.filter(({ id: id1 }) => {
			return !merged.some(({ v_id: id2 }) => {
				return id2 === id1
			})	
		});
		console.log(unclaimed_vlogs)

		return(
			<div className={s('vlogger-update')}>
				<div className={s("vlogger-update-delete")}
					onClick={()=>{
						removeVlogger(this.props.active_vlogger.id);
						fetchVlogger(null);
					}}>Delete Vlogger</div>
				<div className={s("vlogger-update-info")}>
					<label>Name:</label>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.name }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { name: e.target.value })
						}}/>
					<label>Additional Info:</label>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.additional_info }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { additional_info: e.target.value })
						}}/>
					<label>Image URL:</label>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.profile_img }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { profile_img: e.target.value })
						}}/>
					<div className={s("current_videos")}>
						{ vlogs.map((vlog, i) => {
							const filtered = current_videos.filter(video => vlog.v_id === video.id);

							return(
								<div className={s("current_video")} key={i}>
									<h2>{filtered[0].data.title}</h2>
									<div className={s("x-out")}
										onClick={()=> {
											const remove = vlogs.filter(vid => vid.v_id !== vlog.v_id)
											updateVlogger(id, { vlogs: remove })
										}}>
										&#10005;
									</div>
								</div>
							)

						})}
						
					</div>
					

				</div>
				<AddVideo
					current_videos = { current_videos }
					updateVideos = { this.updateVideos }
					id = { id }
					active_user_vlogs = { vlogs } 
					unclaimed_vlogs = { unclaimed_vlogs }/>
			</div>
		)
	}
}



export default VloggerUpdate;