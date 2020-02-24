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
			bbox: []
		},
		input1: '',
		input2: ''

	}
	state = this.initialState;
	

	componentDidMount() {
		const collectionRef = firestore.collection('collections');
		collectionRef.onSnapshot(async snapshot => {
			console.log(snapshot)
		})
	}

	updateLocation = ( newState ) => {
		this.setState(prevState => ({
			location_builder: {...prevState.location_builder, ...newState}
		}))
	}

	clearState = () => {
		this.updateLocation(this.initialState.location_builder)
		this.setState({
			input1:null,
			input2:null
		})
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

				<a className="submit"
					onClick={()=> addLocation(this.state.location_builder)}>Submit pls</a>	
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