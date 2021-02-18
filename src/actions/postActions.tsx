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
	POST_SEARCH_REQUEST,
	POST_SEARCH_SUCCESS,
	POST_SORT_REQUEST,
	POST_SORT_SUCCESS,
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

		const { tracker, orderBy, sort, search } = getState().postReducer;

		const { data, next, hasmore } = await getInfiniteData(
			limit,
			'posts',
			tracker,
			orderBy,
			sort,
			search
		);

		dispatch({
			type: POST_INIFINITE_SUCCESS,
			payload: { data, tracker: next, hasmore },
		});
	} catch (error) {
		console.log(error);
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

		const { pPosts, orderBy, sort, search } = getState().postReducer;

		const { data, nHasmore, pHasmore } = await getPaginateDataNext(
			limit,
			'posts',
			pPosts[pPosts.length - 1]?.id,
			orderBy,
			sort,
			search
		);

		dispatch({
			type: POST_PAGINATE_NEXT_SUCCESS,
			payload: {
				nData: data,
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

		const { pPosts, orderBy, sort, search } = getState().postReducer;

		const { data, nHasmore, pHasmore } = await getPaginateDataPrev(
			limit,
			'posts',
			pPosts[0]?.id,
			orderBy,
			sort,
			search
		);

		dispatch({
			type: POST_PAGINATE_PREV_SUCCESS,
			payload: {
				pData: data,
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

export const sortPost = (orderBy: string, sort: FirebaseSort) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_SORT_REQUEST, payload: { orderBy, sort } });

		dispatch(getPostInfinite(8));
		dispatch(getPaginateNext(8));

		dispatch({ type: POST_SORT_SUCCESS });
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};

export const searchPost = (search: string) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_SEARCH_REQUEST, payload: { search } });

		dispatch(getPostInfinite(8));
		dispatch(getPaginateNext(8));

		dispatch({ type: POST_SEARCH_SUCCESS });
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: JSON.stringify(error),
		});
	}
};
