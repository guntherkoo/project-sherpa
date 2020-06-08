import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './ExperienceBuilder.scss';

class ExperienceBuilder extends Component {

	render() {

		let { 
			vlogs,
			map,
			businesses,
			add_content,
			playVideo,
			video,
			new_vlog
		} = this.props;


		if(!businesses || !new_vlog) return <div></div>
		return(
			<div className = {s('experience_builder')}>
				
				<div className={s('experience_builder-experiences')}>
					{ businesses &&
						<pre>
							{JSON.stringify(new_vlog, null, 2)}
							{ JSON.stringify(businesses, null, 2) }
						</pre>
					}
				</div>

				
			</div>

		)
	}
}

const mapStateToProps = state => {
	return {
		businesses: state.content.businesses,
		map: state.map.set_map,
		video: state.video.player,
		new_vlog : state.content.new_vlog
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExperienceBuilder);