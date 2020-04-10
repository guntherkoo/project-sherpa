import Router, { useRouter } from 'next/router'
import { Link } from '../../../routes.js';
import {useEffect} from 'react'

import s from '../Vloggers.scss';

const Vlogger = ({ vlogger, vlogs, city }) => {
	const router = useRouter();
	let path = router.asPath

	return(
		<div className={s("Vlogger")}>
			<Link href={{ pathname: '/', query: { city: city, vlogger: vlogger.id } }}>
				<a >
					<div className={s("profile-pic")}
						style={{ backgroundImage: `url(${vlogger.data.profile_img})`}}></div>
					<h1>{vlogger.data.name}</h1>
					</a>
			</Link>

		</div>
	)
}

export default Vlogger;