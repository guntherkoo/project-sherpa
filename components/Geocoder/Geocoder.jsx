import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './Geocoder.scss';

class Geocoder extends Component {
	
	state = {
		input_field: ''
	}

	

	yieldedCities=({ content, map, getCurrentCity, updateNewVlog }) => {
		let { input_location } = content;
		if(input_location) {
			let cities = input_location.features.map((feature, key) => {
				let { center, bbox, place_name  } = feature
				let init_experience = { "city": place_name, "coordinates": center }
				return(
					<a key= { key }
						className={ s('location_results') } 
						onClick={ () => {
							map.set_map.jumpTo({
								center: center
							})
							getCurrentCity(feature);
							updateNewVlog(init_experience, null)
						}}>{ feature.place_name }</a>
				)
			}) 
			return cities
		}
	}

	yieldedBusinesses = ({ content, map, updateNewVlog }) => {
		let { input_business, new_vlog } = content;
		console.log(input_business, new_vlog);
		if(input_business && new_vlog) {
			let businesses = input_business.features.map((feature, key) => {
				let { center, place_name, text  } = feature;
				let { locations } = new_vlog
				let business = { "name": text, "coordinates": center, "id": (locations ? locations.length + 1 : 1) }
				
				return(
					<a key= {key}
						className={s('location_results')} 
						data-place-name= { feature.place_name }
						onClick={() => {
							map.set_map.jumpTo({
								center: center,
								zoom: 15
							});
							this.addBusinessToExperience(new_vlog, business, updateNewVlog);

						}}>{ feature.text }</a>
				)
			}) 
			return businesses
		}
		
	}

	addBusinessToExperience(new_vlog, business, updateNewVlog) {
		let { locations } = new_vlog
		if(!locations) {
			updateNewVlog({ 'locations': [ business ] }, new_vlog)
		} else {
			let new_locations = locations.push(business)
			console.log(locations);
			updateNewVlog(locations, new_locations)
		}
	}

	render() {
		let { 
			map, 
			fetchInputLocation, 
			input_location,  
			new_vlog, 
			content, 
			fetchBusinessLocation } = this.props;
		let {
			input_field } = this.state;

		if(!new_vlog ) {
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
		if(new_vlog) {
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
	// console.log(state)
	return {
		content 		: state.content,
		map 			: state.map,
		new_vlog 		: state.content.new_vlog
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