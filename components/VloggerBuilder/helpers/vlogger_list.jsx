import s from '../VloggerBuilder.scss';
import Router from 'next/router'


const VloggerList = ({ vloggers, fetchVlogger, updateVlogger }) => {
	if(!vloggers) return <div></div>
	return(
		<div className={s('vlogger-list')}>
			{
				vloggers.map(vlogger => (
					<div className={s("vlogger-item")}
						key = { vlogger.id }
						onClick ={()=> { 
							let { id, data } = vlogger;
							fetchVlogger(vlogger) 
							updateVlogger(id, {id, ...data})
							console.log(vlogger)
						}}>
						{(vlogger.data.profile_img ? 
							<div className={s("initials")} style={{	
								backgroundImage: `url(${vlogger.data.profile_img})`,
								backgroundSize: 'contain'
							}}></div>: 
							<span className={s("initials")}>
								{ vlogger.data.name.match(/\b(\w)/g).join('').toUpperCase().substr(0, 2) }
							</span>
							)}
						
						<div className={s("vlogger-item-details")}>
							<h2 className={s("name")}>
								{ vlogger.data.name }
							</h2>
							<p className={s("videos")}>
								Videos: { vlogger.data.vlogs.length }
							</p>
						</div>
					</div>
				))
			}
			

		</div>
	)
	
}

export default VloggerList