import {
	FORM_ADD,
	FORM_UPDATE,
	MODAL_HIDE,
	MODAL_SHOW,
} from '../constants/appConstants';

export const modalReducer = (
	state = { modalShow: false },
	action: AppAction
): AppState => {
	switch (action.type) {
		case MODAL_SHOW:
			return { ...state, modalShow: true };
		case MODAL_HIDE:
			return { ...state, modalShow: false };
		default:
			return state;
	}
};

export const formReducer = (
	state = { isUpdating: false, currentPost: {} },
	action: AppAction
): AppState => {
	switch (action.type) {
		case FORM_ADD:
			return { ...state, isUpdating: false, currentPost: {} };
		case FORM_UPDATE:
			return { ...state, isUpdating: true, currentPost: action.payload };
		default:
			return state;
	}
};
