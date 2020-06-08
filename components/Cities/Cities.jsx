import { Component } from 'react'

import s from './Cities.scss';

import City from './helpers/City';

import { firestore } from '../../lib/firebase';

class Cities extends Component {

	componentDidMount() {
		const snapshotRef = firestore.collection('cities').onSnapshot((snapshot) => {
			let citiesSnapshot = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					data: doc.data()
				}	
			})
			this.props.fetchCities(citiesSnapshot)

		  }, (error) => {
		    console.log(error)
		  });
	}


	render() {
		let { cities } = this.props;
		if(!cities) return <div></div>
		return(
			<div className={s('Cities')}>
				{ cities.map(city => {
					console.log(city)
					return (
						<City city = { city }/>
					)
				})}
				
			</div>
		)
	}
	
}

export default Cities;