import { Component } from 'react';

import { firestore, removeVlog, updateVlogInfo } from '../../lib/firebase';
import { connect } from 'react-redux';

import SidebarWrapper from '../SidebarWrapper';
import AllVlogs from './helpers/AllVlogs';

import s from './VlogUpdate.scss';


class VlogUpdate extends Component {
	
	initialState = { 	
		vlog_update: {
			id: '',
			title: '',
			url: '',
			city: ''
		}
	}

	state = this.initialState;

	updateVlog = ( id, newState ) => {
		this.setState(prevState => ({
			vlog_update: {...prevState.vlog_update, ...newState}
		}))	
		updateVlogInfo(id, newState)
	}

	resetState = () => {
		this.setState({ vlogger_update: this.initialState })
	}

	render() {

		let { current_videos, all_vlogs, target_video } = this.props;
		 let { id, title, url, city } = this.state.vlog_update;
		 console.log(target_video);
		return(
			<div className={s('VlogUpdate')}>
				<SidebarWrapper>
					<AllVlogs
						all_vlogs = { all_vlogs } 
						updateVlog = { this.updateVlog }/> 
				</SidebarWrapper>
				
				<div className={s("VlogUpdate-vlog")}>
					<div className={s("VlogUpdate-delete")}
						onClick={()=>{
							removeVlog(target_video.id);
						}}>Delete Vlogger</div>
					<div className={s("VlogUpdate-info")}>
						<label>Title:</label>
						<input className={s('input')} 
							type='text' 
							value = { (title ? title : "") }
							onChange = { e => {	
								let input_value = e.target.value;
								this.updateVlog(id, { title: e.target.value })
							}}/>
						<label>Video URL:</label>
						<input className={s('input')} 
							type='text' 
							value = { (url ? url : "") }
							onChange = { e => {	
								let input_value = e.target.value;
								this.updateVlog(id, { url: e.target.value })
							}}/>
						<label>City</label>
						<input className={s('input')} 
							type='text' 
							value = { (city ? city : "") }
							onChange = { e => {	
								let input_value = e.target.value;
								this.updateVlog(id, { city: e.target.value })
							}}/>
					</div>
				</div>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		all_vlogs: state.video.all_videos,
		target_video: state.video.target_video
	}
}



export default connect(mapStateToProps)(VlogUpdate);