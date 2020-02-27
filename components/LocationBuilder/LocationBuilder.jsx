import React, { Component } from 'react';
import { connect } from 'react-redux';

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
	

	componentDidMount() {
		const collectionRef = firestore.collection('locations');
		collectionRef.onSnapshot(async snapshot => {
			const mapLocation = snapshot.docChanges().map(loc => {
				// console.log(loc.doc.data())
			})
		})
	}

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

	render() {
		let { map, location, business, fetchInputLocation, fetchBusinessLocation } = this.props;
		let { area_name, business_name, bbox } = this.state.location_builder;

		return (
			<div className={s('LocationBuilder')}>
				
				{( !area_name ? 
					<Geocode message= {"State, City, Country"} 
						disabled={ false } 
						fetchLocation = { fetchInputLocation } 
						updateLocation = { this.updateLocation }
						location = { location }
						map = { map }
						input = { this.state.input1 }  
						updateInput = { this.updateInput1 }/> : 
						<div className={s("entered-name")}>
							<h2>{area_name}</h2>
							<div className={s("x-out")}
								onClick={()=> {
									this.clearState()
									// fetchBusinessLocation('')
								}}>
								&#10005;
							</div>
						</div>)}	
				
				{( !business_name ? 
					<Geocode message= {"Business, POI, etc"} 
						disabled={ ( area_name ? false : true) }
						fetchBusiness = { fetchBusinessLocation } 
						updateLocation = { this.updateLocation }
						business = { business }
						bbox = { bbox }
						map = { map }
						input = { this.state.input2 } 
						updateInput = { this.updateInput2 } /> : 
						<div className={s("entered-name")}>
							<h2>{business_name}</h2>
							<div className={s("x-out")}
								onClick={()=>{
									this.updateLocation({ business_name:null });
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
						this.updateLocation({ price: input_value });
					}}/>
				<textarea 
					placeholder="Additional Info"
					type = 'text'
					value = { this.state.input4 }
					onChange = { e => {	
						let input_value = e.target.value;
						this.updateInput4(input_value)
						this.updateLocation({ additional_info: input_value });
					}}></textarea>

				<a className="submit"
					onClick={()=> {
						addLocation(this.state.location_builder)
						this.clearState();
						alert('Location Submitted')
					}}>Submit</a>	
			</div>
		)
	}
	
}  

const mapStateToProps = state => {
	return {
		location: state.geocoder.input_location,
		business: state.geocoder.input_business,
		map: state.map.set_map
	}
}


const mapDispatchToProps = dispatch => ({
	fetchInputLocation: (location, bbox) => dispatch(GeocodeAction.fetchInputLocation(location)),
	fetchBusinessLocation: (location, bbox) => dispatch(GeocodeAction.fetchBusinessLocation(location, bbox))
})

export default connect( mapStateToProps, mapDispatchToProps )(LocationBuilder);