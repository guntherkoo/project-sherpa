import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import s from './Dashboard.scss';

class Dashboard extends Component {
	render() {
		return (
			<div>
				This is the dashboard
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

export default connect(
	mapStateToProps,
	null
)(Dashboard);