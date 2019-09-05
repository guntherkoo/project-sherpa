import { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import s from './ExperienceBuilder.scss';

class VlogContainer extends Component {

	render() {

		let { 
			vlogs,
			map,
			businesses,
			add_content,
			playVideo,
			video
		} = this.props;
		if(!businesses) return <div></div>
		return(
			<div className = {s('experience_builder')}>
				
				<div className={s('experience_builder-experiences')}>
					{ businesses &&
						businesses.map((loc, i)=>{
						return (
							<div className="experience_builder-experience" key={i}>
								{loc.name}
							</div>
						)
					}) }
				</div>

				
			</div>

		)
	}
}


const mapStateToProps = state => {
	console.log(state);
	return {
		businesses: state.content.businesses,
		map: state.map.set_map,
		video: state.video.player
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VlogContainer);