import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';
import { firestore, updateVloggerInfo } from '../lib/firebase';

import { VloggersAction } from '../redux-store/vloggers/vloggers.actions';


import GlobalStyles from 'styles/styles.scss';
import Head from './_head';

import Vloggers from '../components/Vloggers';
import Vlogger from '../components/Vlogger';
const Map = dynamic(() =>
	import('../components/Map'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)



class Index extends Component {
	static getInitialProps = async({ reduxStore, req, query }) => {
		const isServer = !!req
		const collectionRef = await firestore.collection('videos').get();

		const getVlogs = collectionRef.docs.map(d => {
			return {
				id: d.id,
				data: d.data()
			}
		});
		return {
			query,
			getVlogs
		}
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

	static defaultProps = {

	}


	render() {
		let { 
			map, 
			content, 
			center,
			vloggers,
			query,
			getVlogs } = this.props;
			console.log(this.props);
		return (
			<section>
				<Map />
				{!query.vlogger ? 
					<Vloggers 
						vloggers={ vloggers }
						vlogs = { getVlogs }/> :
					<Vlogger />
				}
				
				
			</section>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		vloggers: state.vloggers.vloggers
	}
}

const mapDispatchToProps = dispatch => ({
	fetchLiveVloggers: (vloggers) => dispatch(VloggersAction.fetchLiveVloggers(vloggers)),
	fetchVlogger: (vlogger) => dispatch(VloggersAction.fetchVlogger(vlogger))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
