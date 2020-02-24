import React from 'react';

import Link from 'next/link'

import s from '../Geocode.scss';

const GeocodeResults = ({ results, map, handleSubmit, updateLocation, input }) => {
	return(
	<div className= {s('results_container')}>
		{ (results && input ? 
			(results.map((result,i) => {
				return(					
					<a className={s('location_results')} 
						key= {i}
						onClick={(e)=> {
							handleSubmit(result, map);
							updateLocation({business_name: text, coordinates: center})
						}}>
						{ result.place_name }
					</a>					
				)
			})
		): <div></div>)}
	</div>
)};

export default GeocodeResults;