import { connect } from 'react-redux';

import s from '../Cities.scss';
import { Link } from '../../../routes.js'

import { GeocodeAction } from 'redux-store/geocoder/geocoder.actions';

const City = ({ city, fetchInputLocation, city_location }) => {

	let city_reformat = city.data.city.replace(/[, ]+/g, " ").trim().split(' ').join('_').toLowerCase();


	return(
		<div className={s("City")}>
			<Link href={{ pathname: '/', query: { city: city_reformat } }}>
				<a onClick={(()=>{
					fetchInputLocation(city_reformat);
				})}>
					<h1>{city.data.city}</h1>
					</a>
	        </Link>

		</div>
	)
}

const mapStateToProps = state => {
	return {
		map : state.map.set_map,
		city_location: state.geocoder.input_location
	}
}

const mapDispatchToProps = dispatch => ({
	fetchInputLocation: (url) => dispatch(GeocodeAction.fetchInputLocation(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(City);