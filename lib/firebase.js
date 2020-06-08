import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}


export const addLocation = async (locDetails) => {
	const locationRef = firestore.collection('locations').doc();
	const createdAt = new Date();

	try {
		await locationRef.set({
			createdAt,
			...locDetails
		}).then(()=> { console.log('location successfully written') })
	} catch(error) {
		console.log('error creating location', error.message)
	}

	return locationRef;	
}

export const addVideo = async (video) => {
	const locationRef = firestore.collection('videos').doc();
	const createdAt = new Date();

	try {
		await locationRef.set({
			createdAt,
			...video
		}).then(()=> { console.log('video successfully written') })
	} catch(error) {
		console.log('error creating video', error.message)
	}

	return locationRef;	
}

export const addVlogger = async (vlogger) => {
	const vloggerRef = firestore.collection('vloggers').doc();
	const createdAt = new Date();

	try {
		await vloggerRef.set({
			createdAt,
			...vlogger
		}).then(()=> { console.log('vlogger successfully written') })
	} catch(error) {
		console.log('error creating vlogger', error.message)
	}

	return vloggerRef;	
}

export const removeVlogger = async(vloggerId) => {
	const vloggerRef = firestore.collection('vloggers').doc(vloggerId);
	vloggerRef.delete();
}

export const updateVloggerInfo = async(vlgId, vlgUpd) => {
	const vloggerRef = firestore.collection('vloggers').doc(vlgId);
	vloggerRef.update(vlgUpd);
}

export const removeVlog = async(vlogId) => {
	const vlogRef = firestore.collection('videos').doc(vlogId);
	vlogRef.delete();
}

export const updateVlogInfo = async(vlgId, vlgUpd) => {
	const vlogRef = firestore.collection('videos').doc(vlgId);
	vlogRef.update(vlgUpd);
}


export const firestore = firebase.firestore();
export default firebase;
