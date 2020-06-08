import React, { Component } from 'react';
import { connect } from 'react-redux';

import s from './VloggerBuilder.scss';

import VloggerList from './helpers/vlogger_list';

import { VloggersAction } from '../../redux-store/vloggers/vloggers.actions';
import { addVlogger, firestore } from '../../lib/firebase';


class VloggerBuilder extends Component {
	
	render() {

		let { vloggers, fetchVlogger, active_vlogger, vlogger_builder, buildVlogger, updateVlogger } = this.props
		return (
			<div className={s('VloggerBuilder')}>
				<h1>Add Vloggers</h1>
				<input className={s('input')} 
					type='text' 
					placeholder='Vlogger Name' 
					value = { this.props.vlogger_builder.name }
					onChange = { e => {	
						let input_value = e.target.value;
						buildVlogger({ name: e.target.value })
					}}/>
				<input className={s('input')} 
					type='text' 
					placeholder='Additional Info' 
					value = { this.props.vlogger_builder.additional_info }
					onChange = { e => {	
						let input_value = e.target.value;
						buildVlogger({ additional_info: e.target.value })
					}}/>
				<a className="submit"
					onClick={()=> {
						addVlogger(this.props.vlogger_builder)
						alert('Vlogger Submitted')
					}}>Submit</a>

				<h1>Edit Vloggers</h1>
				<VloggerList 
					vloggers= { vloggers }
					fetchVlogger = { fetchVlogger } 
					updateVlogger = { updateVlogger } />
			</div>
		)
	}
	
}  



export default VloggerBuilder;