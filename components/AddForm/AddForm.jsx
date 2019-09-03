import { Component } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux-store/actions';

import VideoPlayer from '../VideoPlayer';
import Geocoder from '../Geocoder';


import s from './AddForm.scss';

class AddForm extends Component {

	state = {
		video_time: 0
	}


	render() {
		let { 
			map, 
			updateExperience, 
			progress_stage, 
			experience,
			updateVideoTime,
			video_time,
			updateBusiness,
			business,
			addToBusinesses,
			addBusinessesToExperience,
			content,
			updateNewVlog,
			new_vlog
		} = this.props

		if(!new_vlog) return <div></div>
		return (
			<div className={s('add_video_form', 'progress_stage')}>
				<div className={s('player_container')}>
					{ content.new_vlog.video ? 
						(<VideoPlayer 
						add_content= { true }
						map = { map }
						video_url = { (content.new_vlog.video) ? content.new_vlog.video : 'null'} 
						updateVideoTime= { updateVideoTime }/>):(<div></div>)
					}
					<div className={s('url_results', (content.new_vlog.video ? '' : 'active'))}>
						<input className={s('url_input')} 
							type="text" 
							placeholder='Video URL' 
							onKeyDown = { e => {
								if (e.key === 'Enter') {
									updateNewVlog({ 'video': e.target.value }, content.new_vlog)
								}
							}}
						/>
					</div>

				</div>
				{ content.new_vlog.video ? (
				<div className={s('video_content_container')}>
					<div className={s('location_geocode', 'text_field')}>
						<Geocoder 
							map= { map }
							progress_stage = { progress_stage }
							updateBusiness = { updateBusiness } 
							business = { business }
							/>
					</div>
					Current Time:
					<input type="text" value= { video_time } disabled/>
					<div className={s('time_stamp_container','text_field')}>
						<div>
							<input type="text" value= {(business ? business.time_start: '0')} disabled/>
							<a  
								className={s('time_stamp')} 
								onClick={() =>{
									updateBusiness({'time_start': video_time})
								}}>Start Loc</a>
						</div>
						<div>
							<input type="text" value= {(business ? business.time_end :'0')} disabled />
							<a 
								className={s('time_stamp')}
								onClick={() =>{
									updateBusiness({'time_end': video_time})
								}}>Stop Loc</a>
						</div>
					</div>
					<a 
						className={s('submit_location')}
						onClick= {() => {
							addToBusinesses();
							// console.log(business)
						}}>Submit Location</a>
					<a 
						className={s('submit_video')}
						onClick = {() => {
							addBusinessesToExperience()
							// console.log(experience);
						}}>Submit Video</a>
				</div>
				): (<div></div>)}				
			</div>
			
		)
	}
}

const mapStateToProps = state => {
	// console.log(state);
	return {
		content 		: state.content,
		new_vlog		: state.content.new_vlog
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateNewVlog(biz, update) {
			dispatch(Action.updateNewVlog(biz, update))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddForm);