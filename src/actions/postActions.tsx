import {
	POST_ADD_REQUEST,
	POST_ADD_SUCCESS,
	POST_DELETE_REQUEST,
	POST_DELETE_SUCCESS,
	POST_DETAILS_REQUEST,
	POST_DETAILS_SUCCESS,
	POST_FAIL,
	POST_INIFINITE_REQUEST,
	POST_INIFINITE_SUCCESS,
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_PAGINATE_NEXT_SUCCESS,
	POST_PAGINATE_PREV_SUCCESS,
	POST_PAGINATE_REQUEST_NEXT,
	POST_PAGINATE_REQUEST_PREV,
	POST_UPDATE_REQUEST,
	POST_UPDATE_SUCCESS,
} from '../constants/postConstants';
import {
	addData,
	deleteData,
	getAllData,
	getInfiniteData,
	getOneData,
	getPaginateDataNext,
	getPaginateDataPrev,
	updateData,
} from '../utils/firebaseHelpers';

export const listPosts = () => async (dispatch: DispatchType) => {
	try {
		dispatch({ type: POST_LIST_REQUEST });

		const data = await getAllData('posts');

		dispatch({ type: POST_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};

export const getPostDetails = (id: string) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_DETAILS_REQUEST });

		const data = await getOneData(id, 'posts');

		dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};

// Infinite Loading
export const getPostInfinite = (limit: number) => async (
	dispatch: DispatchType,
	getState: any
) => {
	try {
		const _hasmore = getState().postReducer.hasmore;

		if (!_hasmore) return;

		dispatch({ type: POST_INIFINITE_REQUEST });

		const { tracker } = getState().postReducer;

		const { data, next, hasmore } = await getInfiniteData(
			limit,
			'posts',
			tracker
		);

		dispatch({
			type: POST_INIFINITE_SUCCESS,
			payload: { data, tracker: next, hasmore },
		});
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
			hasmore: false,
		});
	}
};

// PAGINATE NEXT
export const getPaginateNext = (limit: number) => async (
	dispatch: DispatchType,
	getState: any
) => {
	try {
		const _hasmore = getState().postReducer.hasmore;

		if (!_hasmore) return;

		dispatch({ type: POST_PAGINATE_REQUEST_NEXT });

		const { trackerNext } = getState().postReducer;

		const { data, next, nHasmore, pHasmore, prev } = await getPaginateDataNext(
			limit,
			'posts',
			trackerNext
		);

		dispatch({
			type: POST_PAGINATE_NEXT_SUCCESS,
			payload: {
				nData: data,
				trackerNext: next,
				trackerPrev: prev,
				nHasmore,
				pHasmore,
			},
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: POST_FAIL,
			payload: error,
			nHasmore: false,
		});
	}
};

// PAGINATE PREV
export const getPaginatePrev = (limit: number) => async (
	dispatch: DispatchType,
	getState: any
) => {
	try {
		const _hasmore = getState().postReducer.hasmore;

		if (!_hasmore) return;

		dispatch({ type: POST_PAGINATE_REQUEST_PREV });

		const { trackerPrev } = getState().postReducer;

		const { data, prev, next, nHasmore, pHasmore } = await getPaginateDataPrev(
			limit,
			'posts',
			trackerPrev
		);

		dispatch({
			type: POST_PAGINATE_PREV_SUCCESS,
			payload: {
				pData: data,
				trackerPrev: prev,
				trackerNext: next,
				pHasmore,
				nHasmore,
			},
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: POST_FAIL,
			payload: error,
			pHasmore: false,
		});
	}
};

export const addPost = ({ title, content, image }: IFormState) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_ADD_REQUEST });

		await addData({ title, content, image }, 'posts');
		dispatch({ type: POST_ADD_SUCCESS });

		dispatch(listPosts());
		dispatch(getPostInfinite(8));
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};

export const deletePost = (id: string) => async (dispatch: DispatchType) => {
	try {
		dispatch({ type: POST_DELETE_REQUEST });

		await deleteData(id, 'posts');

		dispatch({ type: POST_DELETE_SUCCESS, payload: id });

		dispatch(listPosts());
		dispatch(getPostInfinite(8));
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};

export const updatePost = (id: string, data: object) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_UPDATE_REQUEST });

		await updateData(id, data, 'posts');
		dispatch({ type: POST_UPDATE_SUCCESS, payload: { id, data } });

		dispatch(listPosts());
		dispatch(getPostInfinite(8));
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};
