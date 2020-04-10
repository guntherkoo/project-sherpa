import { Component } from 'react';
import { connect } from 'react-redux';
import { firestore, updateVlogInfo } from '../lib/firebase';

import VlogUpdate from '../components/VlogUpdate';

import { VideoAction } from '../redux-store/video/video.actions';


class UpdateVlog extends Component {
	static getInitialProps = async ({ query }) => {

		return { 
			// current_videos : getVideos 
		}
	}

	componentDidMount() {
		const snapshotRef = firestore.collection('videos').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
			let vlogsSnapshot = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					data: doc.data()
				}	
			})
			this.props.liveAllVideos(vlogsSnapshot)

		  }, (error) => {
		    console.log(error)
		  });
	}

	render() {
		let { all_vlogs } = this.props
		return(
			<div>				
				<VlogUpdate />
			</div>
		)
	}
} 


const mapStateToProps = state => {
	console.log(state);
	return {
		active_vlogger : state.vloggers.active_vlogger,
		vloggers: state.vloggers.vloggers,
		all_vlogs: state.video.all_videos
	}
}

const mapDispatchToProps = dispatch => ({
	liveAllVideos: (locations) => dispatch(VideoAction.liveAllVideos(locations))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateVlog);