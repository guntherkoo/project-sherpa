import s from '../VlogUpdate.scss';

import { VideoAction } from 'redux-store/video/video.actions';

import { connect } from 'react-redux';


const AllVlogs = ({ all_vlogs, editTargetVideo, updateVlog }) => {
	if(!all_vlogs) return <div></div>
	console.log(all_vlogs)
	return(
		<div className={s('vlog-list')}>
			{
				all_vlogs.map(vlog => (
					<div className={s("vlog-item")}
						key = { vlog.id }
						onClick ={()=> { 
							let { id, data } = vlog;
							editTargetVideo(vlog)
							updateVlog(id, {id, ...data})
						}}>
						{
							// (vlog.data.profile_img ? 
							// <div className={s("initials")} style={{	
							//   backgroundImage: `url(${vlogger.data.profile_img})`,
							// 	 backgroundSize: 'contain'
							// }}></div>: 
							// <span className={s("initials")}>
							// 	{ vlogger.data.name.match(/\b(\w)/g).join('').toUpperCase().substr(0, 2) }
							// </span>
							// )
						}
						
						<div className={s("vlog-item-details")}>
							<h2 className={s("name")}>
								{ vlog.data.title }
							</h2>
							<p className={s("videos")}>
								Locations: { vlog.data.locations.length }
							</p>
						</div>
					</div>
				))
			}
			

		</div>
	)
	
}

const mapDispatchToProps = dispatch => ({
	editTargetVideo: (video) => dispatch(VideoAction.editTargetVideo(video))
})

export default connect(null, mapDispatchToProps)(AllVlogs)