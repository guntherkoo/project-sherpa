import React from 'react';

import Link from 'next/link'

import s from '../Geocode.scss';

const GeocodeResults = ({ results, map, handleSubmit, updateGeolocation, input, result_type }) => {
	// console.log(results, input)
	return(
	<div className= {s('results_container')}>
		{ (results && input ? 
			(results.map((result,i) => {
				return(					
					<a className={s('location_results')} 
						key= {i}
						onClick={(e)=> {
							handleSubmit(result, map);

							(result_type === "location" ? 
								updateGeolocation({location: {area_name: result.text, bbox: result.bbox}}) : 
								updateGeolocation({business: {business_name: result.text, coordinates: result.center}}))
							
						}}>
						{ result.place_name }
					</a>					
				)
			})
		): <div></div>)}
	</div>
)};

export default GeocodeResults;