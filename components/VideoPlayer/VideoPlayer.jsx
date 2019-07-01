import ReactPlayer from 'react-player';
import s from './VideoPlayer.scss';

function VideoPlayer(props) {
	return(
		<ReactPlayer 
			url={'https://www.youtube.com/watch?v=xbHbcmQIcAQ'} 
			playing = { false } 
			width='30%' 
			height='30%'
			controls= { true }
			onProgress = { (e)=> {
				console.log(e)
			}}
			className={s('VideoPlayer')}/>
	)
}

export default VideoPlayer; 