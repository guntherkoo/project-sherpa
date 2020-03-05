import { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { firestore, updateVloggerInfo } from '../lib/firebase';

import GlobalStyles from 'styles/styles.scss';

import VloggerBuilder from '../components/VloggerBuilder';
import VloggerUpdate from '../components/VloggerUpdate';

import { VloggersAction } from '../redux-store/vloggers/vloggers.actions';



class AddVloggers extends Component {
	getInitialProps = async ({ query }) => {
		return { 
			query 
		}
	}

	initialState = { 
		vlogger_builder: {
			name: '',
			vlogs: [],
			profile_img: '',
			additional_info: ''
		},
		vlogger_update: {
			id: '',
			name: '',
			vlogs: [],
			profile_img: '',
			additional_info: ''
		}
	}
	state = this.initialState;

	buildVlogger = ( newState ) => {
		this.setState(prevState => ({
			vlogger_builder: {...prevState.vlogger_builder, ...newState}
		}))
	}

	updateVlogger = ( id, newState ) => {
		this.setState(prevState => ({
			vlogger_update: {...prevState.vlogger_update, ...newState}
		}))	
		updateVloggerInfo(id, newState)
	}

	resetState = () => {
		this.setState({ vlogger_update: this.initialState })
	}

	componentDidMount() {
		const snapshotRef = 
			firestore.collection('vloggers').orderBy("createdAt", "desc").onSnapshot((snapshot) => {
				let vloggersSnapshot = snapshot.docs.map(doc => {
					return {
						id: doc.id,
						data: doc.data()
					}	
				})
				this.props.fetchLiveVloggers(vloggersSnapshot)

			  }, (error) => {
			    console.log(error)
			  });
	}

	render() {
		let { vloggers, active_vlogger, fetchVlogger } = this.props
		return(
			<div>
				<VloggerBuilder 
					fetchVlogger = { fetchVlogger }
					vloggers = { vloggers }
					buildVlogger = { this.buildVlogger } 
					vlogger_builder = { this.state.vlogger_builder }
					updateVlogger = { this.updateVlogger } />
				<VloggerUpdate 
					active_vlogger = { active_vlogger }
					fetchVlogger = { fetchVlogger }
					updateVlogger = { this.updateVlogger } 
					vlogger_update = { this.state.vlogger_update } />
			</div>
		)
	}
} 


const mapStateToProps = state => {
	return {
		active_vlogger : state.vloggers.active_vlogger,
		vloggers: state.vloggers.vloggers
	}
}

const mapDispatchToProps = dispatch => ({
	fetchLiveVloggers: (vloggers) => dispatch(VloggersAction.fetchLiveVloggers(vloggers)),
	fetchVlogger: (vlogger) => dispatch(VloggersAction.fetchVlogger(vlogger))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddVloggers));