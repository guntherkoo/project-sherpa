import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './Geocoder.scss';

class Geocoder extends Component {
	
	state = {
		input_field: '',
		progress_stage: 1
	}

	

	yieldedCities=({ content, map, getCurrentCity, updateNewVlog, updateExperience }) => {
		let { input_location } = content;
		if(input_location) {
			let cities = input_location.features.map((feature, key) => {
				let { center, bbox, place_name  } = feature
				let init_experience = { "city": place_name, "coordinates": center }
				return(
					<a key= { key }
						className={ s('location_results') } 
						data-place-name= { feature.place_name }
						onClick={ () => {
							map.set_map.jumpTo({
								center: center
							})
							getCurrentCity(feature);
							updateNewVlog(init_experience, null)
							updateExperience();
						}}>{ feature.place_name }</a>
				)
			}) 
			return cities
		}
	}

	yieldedBusinesses = ({ content, map,  updateBusiness }) => {
		let { input_business, new_vlog } = content;
		if(input_business && new_vlog) {
			let businesses = input_business.features.map((feature, key) => {
				let { center, bbox, place_name  } = feature;
				let { id } = new_vlog
				let business_experience = { "name": place_name, "coordinates": center, "id": id+1 }
				
				return(
					<a key= {key}
						className={s('location_results')} 
						data-place-name= { feature.place_name }
						onClick={() => {
							map.jumpTo({
								center: center,
								zoom: 15
							})
							updateBusiness(business_experience)

						}}>{ feature.place_name }</a>
				)
			}) 
			return businesses
		}
		
	}

	render() {
		let { 
			map, 
			fetchInputLocation, 
			input_location,  
			current_city, 
			content, 
			progress_stage,
			fetchBusinessLocation } = this.props;
		let {
			input_field } = this.state;

			console.log(input_field)

		if(!current_city && progress_stage === 1) {
			return (
				<div className={s('search_results')}>
					<input className={s('add_input')} 
						type='text' 
						placeholder='What city did you visit?'
						onChange = { e => {
							if(e.target.value) {
								fetchInputLocation(e.target.value)
							}
							this.setState({
								input_field: e.target.value
							})
						}}/>
					<div className={ s('yielded_cities', (this.state.input_field !== '' ? 'active' : '')) }>
						{ this.yieldedCities(this.props) }
					</div>
					
				</div>
				
			)
		}
		if(progress_stage === 2 ) {
			return (
				<div className={s('search_business')}>
					<input className={s('input')} 
						type='text' 
						placeholder='Insert business:'
						onChange = { e => {
							if(e.target.value) {
								fetchBusinessLocation(e.target.value, content.current_city.bbox);
							}
							
						}}/>
					<div className= {s('results_container')}>
						{this.yieldedBusinesses(this.props)}
					</div>
					
				</div>
			)
		}
		return(
			<div></div>
		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return {
		content 		: state.content,
		map 			: state.map,
		current_city 	: state.current_city
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchBusinessLocation(business, bbox) {
			dispatch(Action.fetchBusinessLocation(business, bbox))
		},
		fetchInputLocation(location) {
			dispatch(Action.fetchInputLocation(location))
		},
		getCurrentCity(city) {
			dispatch(Action.getCurrentCity(city))
		},
		updateNewVlog(biz, update) {
			dispatch(Action.updateNewVlog(biz, update))
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Geocoder);