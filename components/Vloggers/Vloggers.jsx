import s from './Vloggers.scss';
import Vlogger from './helpers/Vlogger';


const Vloggers = ({ vloggers, vlogs }) => {
	if(!vloggers) return false;
	return(
		<div className={s('Vloggers')}>
			{vloggers.map((vlogger) => {
				return(
					<Vlogger 
						key={vlogger.id}
						vlogger={ vlogger }
						vlogs = { vlogs } />
				)
			})}
		</div>
	)
}

export default Vloggers;