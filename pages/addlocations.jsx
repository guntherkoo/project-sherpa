import { Component } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
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
	static async getInitialProps ({query}) {
		
		return { query }
	}


	render() {
		console.log(this.props)
		return(
			<div>
				<Map />
				<LocationBuilder />
			</div>
			
		)
	}
}

export default withRouter(AddLocations);