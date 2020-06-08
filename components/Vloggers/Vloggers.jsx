import s from './Vloggers.scss';
import Vlogger from './helpers/Vlogger';


const Vloggers = ({ vloggers, vlogs, city, allVlogs }) => {
	if(!vloggers) return false;

	console.log(allVlogs, vloggers)

	const underscore = (el) => {
		return el.replace(/[, ]+/g, " ").trim().split(' ').join('_').toLowerCase();
		// el.split(' ').join('_').replace(',', '_').toLowerCase()
	}

	const filtered_vlog_city = allVlogs.filter(({ data }) => {
		let vlog_city = underscore(data.city);
		let query_city = underscore(city);
		console.log(vlog_city, query_city)
		return vlog_city === query_city
	});

	const filtered_vloggers = vloggers.filter(vlogger => {
		return vlogger.data.vlogs.some(({v_id: id1})=> {
			return filtered_vlog_city.some(({id: id2})=> {
				return id1 === id2
			})
		})
	})


	console.log(filtered_vloggers)
	return(
		<div className={s('Vloggers')}>
			{filtered_vloggers.map((vlogger) => {
				return(
					<Vlogger 
						key={vlogger.id}
						vlogger={ vlogger }
						vlogs = { vlogs } 
						city = { city }/>
				)
			})}
		</div>
	)
}

export default Vloggers;