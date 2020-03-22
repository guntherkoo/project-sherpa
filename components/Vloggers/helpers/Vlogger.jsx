import s from '../Vloggers.scss';
import { Link } from '../../../routes.js'

const Vlogger = ({ vlogger, vlogs }) => {
	return(
		<div className={s("Vlogger")}>
			<Link href={{ pathname: '/', query: { vlogger: vlogger.id } }}>
				<a onClick={(()=>{
					console.log(vlogger.data.vlogs, vlogs)
					const results = vlogs.filter(({ id: id1 }) => {
						console.log(id1)
						return vlogger.data.vlogs.some(({ v_id: id2 }) => {
							return id2 === id1
						})
					});
					console.log(results);
				})}>{vlogger.id}</a>
	        </Link>
		</div>
	)
}

export default Vlogger;