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


const AddLocations = ({ query }) => {
	return(
		<div>
			<Map urlQuery = { query }/>
			<LocationBuilder />
		</div>
		
	)
}

AddLocations.getInitialProps = async ({ query }) => {
	return { query }
}














export default withRouter(AddLocations);