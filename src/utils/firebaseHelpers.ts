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

		if (oneSnapshot.exists) {

			return {
				id: oneSnapshot.id,
				...oneSnapshot.data(),
			};
		}
		else {
			throw new Error(`No such document`)
		}
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const getInfiniteData = async (limit: number, collection: string, tracker: string) => {
	try {
		let first;

		if (!tracker) {
			first = db.collection(collection).limit(limit)
		} else {
			const lastDoc = await db.collection(collection).doc(tracker).get();
			first = db.collection(collection).startAfter(lastDoc).limit(limit)
		}

		const documentSnapshots = await first.get()

		const data = documentSnapshots.docs.map((doc: any) => ({
			...doc.data(),
			id: doc.id,
		}))

		const hasmore = data.length > 0 ? true : false

		const lastVisible = documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id;

		return {
			data,
			next: lastVisible,
			hasmore
		}

	} catch (error) {
		throw new Error(`${error}`);
	}
}

const getStartEnd = async (collection: string, field: string) => {
	try {
		const allSnapshot = await db
			.collection(collection).orderBy(field)
			.get();

		const docs = allSnapshot.docs.map((doc) => doc.id);

		return { start: docs[0], end: docs[docs.length - 1] }
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const getPaginateDataNext = async (limit: number, collection: string, last: string) => {
	try {

		const { end, start } = await getStartEnd(collection, 'title');

		let first;

		if (!last) {
			first = db.collection(collection).orderBy('title').limit(limit)
		} else {
			const lastDoc = await db.collection(collection).doc(last).get();
			first = db.collection(collection).orderBy('title').startAfter(lastDoc).limit(limit)
		}

		const documentSnapshots = await first.get()

		const data = documentSnapshots.docs.map((doc: any) => ({
			...doc.data(),
			id: doc.id,
		}))


		const lastVisible = documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id;
		const firstVisible = documentSnapshots?.docs[0]?.id;

		return {
			data,
			prev: firstVisible,
			next: lastVisible,
			nHasmore: lastVisible !== end,
			pHasmore: firstVisible !== start,
		}

	} catch (error) {
		console.error(error)
		throw new Error(`${error}`);
	}
}

const getPaginateDataPrev = async (limit: number, collection: string, first: string) => {
	try {
		const { start, end } = await getStartEnd(collection, 'title');

		const firstDoc = await db.collection(collection).doc(first).get();
		const _first = db.collection(collection).orderBy('title').endBefore(firstDoc).limitToLast(limit)

		const documentSnapshots = await _first.get()

		const data = documentSnapshots.docs.map((doc: any) => ({
			...doc.data(),
			id: doc.id,
		}))

		const lastVisible = documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id;
		const firstVisible = documentSnapshots?.docs[0]?.id;

		return {
			data,
			prev: firstVisible,
			next: lastVisible,
			nHasmore: lastVisible !== end,
			pHasmore: firstVisible !== start,
		}

	} catch (error) {
		console.error(error)
		throw new Error(`${error}`);
	}
}


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

export { getAllData, addData, deleteData, getOneData, updateData, getInfiniteData, getPaginateDataNext, getPaginateDataPrev };

