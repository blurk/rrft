import firebase from '../firebase/config';

const db = firebase.firestore();

const getAllData = async (collection: string) => {
	try {
		const allSnapshot = await db
			.collection(collection)
			.orderBy('createdAt', 'desc')
			.get();

		return allSnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const getOneData = async (id: string, collection: string) => {
	try {
		const oneSnapshot = await db.collection(collection).doc(id).get();

		return {
			id: oneSnapshot.id,
			...oneSnapshot.data(),
		};
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const addData = async (data: IPost | object, collection: string) => {
	try {
		await db.collection(collection).add({
			...data,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const deleteData = async (id: string, collection: string) => {
	try {
		await db.collection(collection).doc(id).delete();
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateData = async (id: string, data: IPost | object, collection: string) => {
	try {
		const docRef = db.collection(collection).doc(id);
		await docRef.update({
			...data,
		});
	} catch (error) {
		throw new Error(`${error}`);
	}
};

export { getAllData, addData, deleteData, getOneData, updateData };

