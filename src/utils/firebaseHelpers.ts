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

const getInfiniteData = async (limit: number, collection: string, tracker: string, orderBy: string, sort: FirebaseSort, search: string) => {
	const searchField = 'title'
	const ref = db.collection(collection)
	let query;

	try {

		if (!tracker) {
			query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort).limit(limit)
				: ref.orderBy(orderBy, sort).limit(limit)
		} else {
			const lastDoc = await ref.doc(tracker).get();

			query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort).startAfter(lastDoc).limit(limit)
				: ref.orderBy(orderBy, sort).startAfter(lastDoc).limit(limit)
		}

		const documentSnapshots = await query.get()

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
		console.log(error)
		throw new Error(`${error}`);
	}
}

const getStartEnd = async (collection: string, orderBy: string, sort: FirebaseSort, search: string) => {
	const searchField = 'title';
	const ref = db.collection(collection)
	const query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort) : ref.orderBy(orderBy, sort)

	try {
		const allSnapshot = await query.get();

		const docs = allSnapshot.docs.map((doc) => doc.id);

		return { start: docs[0], end: docs[docs.length - 1] }
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const getPaginateDataNext = async (limit: number, collection: string, last: string, orderBy: string, sort: FirebaseSort, search: string) => {
	const searchField = 'title'
	const ref = db.collection(collection);
	let query;
	try {
		const { end, start } = await getStartEnd(collection, orderBy, sort, search);

		if (!last) {
			query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort).limit(limit) :
				ref.orderBy(orderBy, sort).limit(limit)
		} else {
			const lastDoc = await ref.doc(last).get();
			query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort).startAfter(lastDoc).limit(limit) : ref.orderBy(orderBy, sort).startAfter(lastDoc).limit(limit)
		}

		const documentSnapshots = await query.get()

		const data = documentSnapshots.docs.map((doc: any) => ({
			...doc.data(),
			id: doc.id,
		}))

		return {
			data,
			prev: documentSnapshots?.docs[0]?.id,
			next: documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id,
			nHasmore: documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id !== end,
			pHasmore: documentSnapshots?.docs[0]?.id !== start,
		}

	} catch (error) {
		console.error(error)
		throw new Error(`${error}`);
	}
}

const getPaginateDataPrev = async (limit: number, collection: string, first: string, orderBy: string, sort: FirebaseSort, search: string) => {
	const searchField = 'title'
	const ref = db.collection(collection);
	let query;
	try {
		const { start, end } = await getStartEnd(collection, orderBy, sort, search);

		const firstDoc = await ref.doc(first).get();
		query = search ? ref.where(searchField, '==', search).orderBy(orderBy, sort).endBefore(firstDoc).limitToLast(limit) : ref.orderBy(orderBy, sort).endBefore(firstDoc).limitToLast(limit)

		const documentSnapshots = await query.get()

		const data = documentSnapshots.docs.map((doc: any) => ({
			...doc.data(),
			id: doc.id,
		}))

		return {
			data,
			prev: documentSnapshots?.docs[0]?.id,
			next: documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id,
			nHasmore: documentSnapshots?.docs[documentSnapshots.docs.length - 1]?.id !== end,
			pHasmore: documentSnapshots?.docs[0]?.id !== start,

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

