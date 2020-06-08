import s from '../VloggerUpdate.scss';


const AddVideos = ({ current_videos, updateVideos, id, active_user_vlogs, unclaimed_vlogs }) => {

	const results = current_videos.filter(({ id: id1 }) => {
		return !active_user_vlogs.some(({ v_id: id2 }) => {
			// console.log(id1, "shit", id2)
			return id2 === id1
		})
	});

	// console.log(active_user_vlogs)

	return(
		<div className={s('AddVideos')}>
			{unclaimed_vlogs.map(video => {
				return (
					<div className={s("AddVideos_video")} 
						key={video.id}
						onClick={()=>{
							updateVideos(video, id)
						}}>
						{video.data.title}
					</div>
				)
			})}
		</div>
	)
}

export default AddVideos;

