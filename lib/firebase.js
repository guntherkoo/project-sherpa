import * as firebase from 'firebase';

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
	console.log(config)
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


export const firestore = firebase.firestore();
export default firebase;
