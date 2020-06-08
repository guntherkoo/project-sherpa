import VloggersType from './vloggers.types';

const VloggersAction = {

	fetchLiveVloggers: (res) => {
		return {
			type: VloggersType.FETCH_LIVE_VLOGGERS,
			payload: res
		}	
	},
	fetchVlogger: (res) => {
		return {
			type: VloggersType.FETCH_VLOGGER,
			payload: res
		}	
	}
	

}

export { VloggersAction };
