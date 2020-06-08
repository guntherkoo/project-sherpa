import s from './Vlogger.scss';
import Vlogs from './helpers/Vlogs';


const Vlogger = ({ vloggers, id, allVlogs, city }) => {
	if(!vloggers) return <div></div>;
	let current_vlogger = vloggers.find((vlog)=> vlog.id === id)
	let { vlogs } = current_vlogger.data
	const current_vlog = allVlogs.filter(({ id: id1 }) => {
		return vlogs.some(({ v_id: id2 }) => {
			// console.log(id1, "shit", id2)
			return id2 === id1
		})
	});

	console.log(current_vlog)

	return(
		<div className={s('Vlogger')}>
			{current_vlog.map((vlog) => {
				console.log(vlog);
				return(
					<Vlogs 
						key = {vlog.id}
						vlog={vlog}
						vlogger={ id }
						city= { city }/>
				)
			})}
		</div>
	)
}

export default Vlogger;