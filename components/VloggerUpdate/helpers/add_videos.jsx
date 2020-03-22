import s from '../VloggerUpdate.scss';


const AddVideos = ({ current_videos, updateVideos, id, active_user_vlogs }) => {

	const results = current_videos.filter(({ id: id1 }) => {
		console.log(id1)
		return !active_user_vlogs.some(({ v_id: id2 }) => {
			return id2 === id1
		})
	});

	console.log(results)
	return(
		<div className={s('AddVideos')}>
			{results.map(video => {
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

