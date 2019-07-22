import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './Geocoder.scss';

class Geocoder extends Component {
	
	yieldedCities=({input_location, map, getCurrentCity, updateExperience}) => {

		if(input_location) {
			let cities = input_location.features.map((feature, key) => {
				let { center, bbox, place_name  } = feature
				let init_experience = { "city": place_name, "coordinates": center }
				return(
					<a  key= {key}
						className={s('location_results')} 
						data-place-name= { feature.place_name }
						onClick={()=> {
							map.jumpTo({
								center: center
							})
							getCurrentCity(feature);
							updateExperience(init_experience)

						}}>{ feature.place_name }</a>
				)
			}) 
			return cities
		}
		
	}

	yieldedBusinesses = ({input_business, map,  updateBusiness, business}) => {
		if(input_business  && business) {
			let businesses = input_business.features.map((feature, key) => {
				let { center, bbox, place_name  } = feature;
				let { id } = business
				let business_experience = { "name": place_name, "coordinates": center, "id": id+1 }
				
				return(
					<a  key= {key}
						className={s('location_results')} 
						data-place-name= { feature.place_name }
						onClick={()=> {
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
			updateExperience, 
			progress_stage,
			fetchBusinessLocation,
			input_business } = this.props;

		if(!current_city && !content && progress_stage === 1) {
			return (
				<div className={s('search_results')}>
					<input className={s('add_input')} 
						type="text" 
						placeholder="What city did you visit?" 
						onChange = { e => {
							if(e.target.value) {
								fetchInputLocation(e.target.value)
							}
						}}/>
					{this.yieldedCities(this.props)}
				</div>
				
			)
		}
		if(progress_stage === 2 ) {
			return (
				<div className={s('search_business')}>
					<input className={s('input')} 
						type="text" 
						placeholder="Insert business:" 
						onChange = { e => {
							if(e.target.value) {
								fetchBusinessLocation(e.target.value, current_city.bbox);
							}
							
						}}/>
					<div className= {s('results_container')}>
						{this.yieldedBusinesses(this.props)}
					</div>
					
				</div>
			)
		}
		return(
			<div>hi</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		current_city 	: state.current_city,
		input_business 	: state.input_business
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchBusinessLocation(business, bbox) {
			dispatch(Action.fetchBusinessLocation(business, bbox))
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Geocoder);