import { Component } from 'react';
import dynamic from 'next/dynamic';
import Router, { withRouter } from 'next/router';
import { addLocation, firestore } from '../lib/firebase';
import { connect } from 'react-redux';

import GlobalStyles from 'styles/styles.scss';

import Geocode from '../components/Geocode';
import LocationBuilder from '../components/LocationBuilder';

const Map = dynamic( () =>
	import('../components/Map'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)



class AddLocations extends Component {
	static getInitialProps = async ({ query }) => {
		const collectionRef = await firestore.collection('locations').get();
		const getLocations = collectionRef.docs.map(d => {

			return {
				id: d.id,
				data: d.data()
			}
		});

		return { 
			locations : getLocations,
			query 
		}
	}


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


	pinClick = (pin) => {
		console.log(pin)
	}

	render() {
		let { query, locations, hover_marker } = this.props
		let queryPin = [parseFloat(query.lng), parseFloat(query.lat)]
		console.log(locations);
		let find_SF = locations.filter(sf => sf.data.location.area_name === "Santa Fe" )
		return(
			<div>
				<Map queryPin = { queryPin } 
					locationPins = { find_SF }
					pinClick = {this.pinClick} 
					hover_marker = { hover_marker }/>
				<LocationBuilder 
					locations = { find_SF }
					updateInput1 = { this.updateInput1 }
					updateInput2 = { this.updateInput2 }
					updateInput3 = { this.updateInput3 }
					updateInput4 = { this.updateInput4 }
					clearState = { this.clearState }
					updateLocation = { this.updateLocation }
					handleSubmit = { this.handleSubmit } 
					location_builder = { this.state.location_builder } 
					input1 = { this.state.input1 }
					input2 = { this.state.input2 }
					input3 = { this.state.input3 }
					input4 = { this.state.input4 }/>
			</div>
			
		)
	}
	
}

const mapStateToProps = state => {
	return {
		hover_marker: state.map.hover_id
	}
}


export default withRouter(connect( mapStateToProps )(AddLocations));