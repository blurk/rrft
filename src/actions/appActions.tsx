import {
	FORM_ADD,
	FORM_UPDATE,
	MODAL_HIDE,
	MODAL_SHOW,
} from '../constants/appConstants';

export const showModal = () => ({ type: MODAL_SHOW });
export const hideModal = () => ({ type: MODAL_HIDE });

export const formUpdate = (currentPost: IPost) => ({
	type: FORM_UPDATE,
	payload: { ...currentPost },
});
export const formAdd = () => ({
	type: FORM_ADD,
});
