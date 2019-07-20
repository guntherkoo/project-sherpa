import { Component } from 'react';
import VideoPlayer from '../VideoPlayer';
import s from './AddForm.scss';

class AddForm extends Component {


	render() {
		let { map } = this.props
		return (
			<div className={s('add-video-form')}>
				<div className={s('player-container')}>
					<VideoPlayer 
						add_content= { true }
						map = { map }
						video_url = {null} />

					<div className={s('url_results')}>
						<input className={s('url_input')} 
							type="text" 
							placeholder="Video URL" 
							onChange = { e => {
								
							}}
							/>
					</div>
				</div>
				
			</div>
			
		)
	}
}

export default AddForm;