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
import { updateObject } from '../utils/object';

export const postReducer = (state = { posts: [] }, action: PostAction) => {
	switch (action.type) {
		// GET ALL
		case POST_LIST_REQUEST:
			return { ...state, loading: true, posts: [] };
		case POST_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				posts: action.payload,
				error: null,
			};
		// GET ONE
		case POST_DETAILS_REQUEST:
			return { ...state, loading: true, postDetails: {} };
		case POST_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				postDetails: action.payload,
			};
		// CREATE
		case POST_ADD_REQUEST:
			return { ...state };
		case POST_ADD_SUCCESS:
			return {
				loading: false,
				error: null,
			};
		// DELETE
		case POST_DELETE_REQUEST:
			return { ...state, loading: true };
		case POST_DELETE_SUCCESS:
			return {
				loading: false,
				error: null,
				posts: state.posts.filter((post: IPost) => post.id !== action.payload),
			};
		// UPDATE
		case POST_UPDATE_REQUEST:
			return { ...state, loading: true };
		case POST_UPDATE_SUCCESS:
			const index = state.posts.findIndex(
				(post: IPost) => post.id === action.payload.id
			);

			const updatedPost = updateObject(state.posts[index], action.payload);
			return {
				loading: false,
				error: null,
				posts: [
					...state.posts.slice(0, index),
					updatedPost,
					...state.posts.slice(index + 1),
				],
			};
		case POST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
