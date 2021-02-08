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
import { updateObject } from '../utils/object';

export const postReducer = (
	state = {
		posts: [],
		chunks: [],
		tracker: '',
		iPosts: [],
		hasmore: true,
		nHasmore: true,
		pHasmore: true,
		pPosts: [],
		trackerNext: '',
		trackerPrev: '',
	},
	action: PostAction
): PostState => {
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

		// GET INFINITE
		case POST_INIFINITE_REQUEST:
			return state.iPosts
				? { ...state, loading: true }
				: { ...state, loading: true, iPosts: [] };
		case POST_INIFINITE_SUCCESS:
			const { data, tracker, hasmore } = action.payload;
			return {
				...state,
				loading: false,
				error: null,
				iPosts: [...state.iPosts, ...data],
				chunks: data,
				tracker,
				hasmore,
			};

		//GET PAGINATE NEXT
		case POST_PAGINATE_REQUEST_NEXT:
			return state.iPosts
				? { ...state, loading: true }
				: { ...state, loading: true, iPosts: [] };
		case POST_PAGINATE_NEXT_SUCCESS:
			const { nData, trackerNext, nHasmore } = action.payload;

			return {
				...state,
				loading: false,
				error: null,
				pPosts: [...nData],
				trackerNext,
				trackerPrev: action.payload.trackerPrev,
				nHasmore,
				pHasmore: action.payload.pHasmore,
			};

		//GET PAGINATE PREV
		case POST_PAGINATE_REQUEST_PREV:
			return state.pPosts
				? { ...state, loading: true }
				: { ...state, loading: true, pPosts: [] };
		case POST_PAGINATE_PREV_SUCCESS:
			const { pData, trackerPrev, pHasmore } = action.payload;
			return {
				...state,
				loading: false,
				error: null,
				pPosts: [...pData],
				trackerPrev,
				trackerNext: action.payload.trackerNext,
				pHasmore,
				nHasmore: action.payload.nHasmore,
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
