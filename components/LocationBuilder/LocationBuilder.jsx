import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router'

import s from './LocationBuilder.scss';

import Geocode from '../Geocode';

import { GeocodeAction } from '../../redux-store/geocoder/geocoder.actions';
import { addLocation, firestore } from '../../lib/firebase';


class LocationBuilder extends Component {
	initialState = { 
		location_builder: {
			area_name: null,
			business_name: null,
			coordinates : [],
			bbox: [],
			price: null,
			additional_info: null
		},
		input1: '',
		input2: '',
		input3: '',
		input4: ''

	}
	state = this.initialState;

	updateLocation = ( newState ) => {
		this.setState(prevState => ({
			location_builder: {...prevState.location_builder, ...newState}
		}))
	}

	clearState = () => {
		this.updateLocation(this.initialState.location_builder)
		this.setState(this.initialState)
	}
	
	updateInput1 = (inp) => {
		this.setState({
			input1: inp
		})
		
	}
	updateInput2 = (inp) => {
		this.setState({
			input2: inp
		})
	}
	updateInput3 = (inp) => {
		this.setState({
			input3: inp
		})
	}
	updateInput4 = (inp) => {
		this.setState({
			input4: inp
		})
	}

	handleSubmit = ({ text, center, place_type }, map) => {
		map.jumpTo({center, zoom: (place_type[0] === "poi" ? 15: 12)});
		Router.push({ pathname:'/addlocations', query: {name: text, lng: center[0], lat: center[1]}})
	}

	render() {
		let { map, 
			location_input, 
			business_input, 
			fetchInputLocation, 
			fetchBusinessLocation, 
			geolocation, 
			updateGeolocation } = this.props;
		let { business_name } = this.state.location_builder;
		let { business, location } = geolocation

		return (
			<div className={s('LocationBuilder')}>
				
				{( !location.area_name ? 
					<Geocode message= {"State, City, Country"} 
						disabled={ false } 
						fetchLocation = { fetchInputLocation } 
						updateLocation = { this.updateLocation }
						location_input = { location_input }
						map = { map }
						input = { this.state.input1 }  
						updateInput = { this.updateInput1 }
						location = { geolocation.location }
						business = { geolocation.business } 
						handleSubmit = { this.handleSubmit }/> : 
						<div className={s("entered-name")}>
							<h2>{location.area_name}</h2>
							<div className={s("x-out")}
								onClick={()=> {
									this.clearState()
									updateGeolocation({location:'', business:''})
								}}>
								&#10005;
							</div>
						</div>)}	
				
				{( !business.business_name ? 
					<Geocode message= {"Business, POI, etc"} 
						disabled={ ( location.area_name ? false : true) }
						fetchBusiness = { fetchBusinessLocation } 
						updateLocation = { this.updateLocation }
						business_input = { business_input }
						bbox = { location.bbox }
						map = { map }
						input = { this.state.input2 } 
						updateInput = { this.updateInput2 } 
						handleSubmit = { this.handleSubmit } /> : 
						<div className={s("entered-name")}>
							<h2>{business.business_name}</h2>
							<div className={s("x-out")}
								onClick={()=>{
									updateGeolocation({business:''})
								}}>
								&#10005;
							</div>
						</div>)}
				<input className={s('input')} 
					type='number' 
					placeholder='Price' 
					value = {this.state.input3}
					onChange = { e => {	
						let input_value = e.target.value;
						this.updateInput3(input_value)
						let new_biz = { ...business };
						new_biz.price = parseInt(input_value);
						updateGeolocation({ business: new_biz})
					}}/>
				<textarea 
					placeholder="Additional Info"
					type = 'text'
					value = { business.additional_info }
					onChange = { e => {	
						let input_value = e.target.value;
						let new_biz = { ...business };
						new_biz.additional_info = input_value;
						updateGeolocation({ business: new_biz });
					}}></textarea>

				<a className="submit"
					onClick={()=> {
						addLocation(geolocation)
						this.clearState();
						alert('Location Submitted')
					}}>Submit</a>	
			</div>
		)
	}
	
}  

const mapStateToProps = state => {
	return {
		location_input: state.geocoder.input_location,
		business_input: state.geocoder.input_business,
		map: state.map.set_map,
		geolocation: state.geocoder.geolocation
	}
}


const mapDispatchToProps = dispatch => ({
	fetchInputLocation: (location, bbox) => dispatch(GeocodeAction.fetchInputLocation(location)),
	fetchBusinessLocation: (location, bbox) => dispatch(GeocodeAction.fetchBusinessLocation(location, bbox)),
	updateGeolocation: (loc) => dispatch(GeocodeAction.updateGeolocation(loc))
})

export default connect( mapStateToProps, mapDispatchToProps )(LocationBuilder);