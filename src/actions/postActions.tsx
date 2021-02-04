import {
	POST_ADD_REQUEST,
	POST_ADD_SUCCESS,
	POST_DELETE_REQUEST,
	POST_DELETE_SUCCESS,
	POST_DETAILS_REQUEST,
	POST_DETAILS_SUCCESS,
	POST_FAIL,
	POST_LIST_REQUEST,
	POST_LIST_SUCCESS,
	POST_UPDATE_REQUEST,
	POST_UPDATE_SUCCESS,
} from '../constants/postConstants';
import {
	addData,
	deleteData,
	getAllData,
	getOneData,
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

export const addPost = ({ title, content, image }: IFormState) => async (
	dispatch: DispatchType
) => {
	try {
		dispatch({ type: POST_ADD_REQUEST });

		await addData({ title, content, image }, 'posts');
		dispatch({ type: POST_ADD_SUCCESS });

		dispatch(listPosts());
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
	} catch (error) {
		dispatch({
			type: POST_FAIL,
			payload: error,
		});
	}
};
