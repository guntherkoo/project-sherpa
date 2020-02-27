import React from 'react';

import Link from 'next/link'

import s from '../Geocode.scss';

const GeocodeResults = ({ results, map, handleSubmit, updateLocation, input, result_type }) => {
	return(
	<div className= {s('results_container')}>
		{ (results && input ? 
			(results.map((result,i) => {
				console.log(result)
				return(					
					<a className={s('location_results')} 
						key= {i}
						onClick={(e)=> {
							handleSubmit(result, map);
							(result_type === "location" ? 
								updateLocation({area_name: result.text, bbox: result.bbox}) : 
								updateLocation({business_name: result.text, coordinates: result.center}))
							
						}}>
						{ result.place_name }
					</a>					
				)
			})
		): <div></div>)}
	</div>
)};

export default GeocodeResults;