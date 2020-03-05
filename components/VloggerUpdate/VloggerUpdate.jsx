import { Component } from 'react';

import { firestore, removeVlogger } from '../../lib/firebase';

import s from './VloggerUpdate.scss';
import TextInput from '../TextInput';


class VloggerUpdate extends Component {
	

	render() {

		if(!this.props.active_vlogger) return <div className={s('vlogger-update')}>Choose a Vlogger to edit</div>;

		let { fetchVlogger, updateVlogger, active_vlogger } = this.props;
		let { additional_info, name, profile_img, vlogs, id } = this.props.vlogger_update;


		return(
			<div className={s('vlogger-update')}>
				<div className={s("vlogger-update-delete")}
					onClick={()=>{
						removeVlogger(this.props.active_vlogger.id);
						fetchVlogger(null);
					}}>Delete Vlogger</div>
				<div className={s("vlogger-update-info")}>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.name }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { name: e.target.value })
						}}/>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.additional_info }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { additional_info: e.target.value })
						}}/>
					<input className={s('input')} 
						type='text' 
						value = { this.props.vlogger_update.profile_img }
						onChange = { e => {	
							let input_value = e.target.value;
							updateVlogger(id, { profile_img: e.target.value })
						}}/>
					<a className={s("submit")}
						onClick={()=> {
							console.log(name, additional_info, profile_img);
						}}>submit</a>
				</div>
			</div>
		)
	}
}

export default VloggerUpdate;