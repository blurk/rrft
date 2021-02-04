import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formAdd, showModal } from '../actions/appActions';

export default function AddPost() {
	const dispatch = useDispatch();

	const modalReducer = useSelector((state: RootState) => state.modalReducer);
	const { modalShow } = modalReducer;

	const openForm = () => {
		dispatch(formAdd());
		dispatch(showModal());
	};
	return (
		<span
			className={`${
				!modalShow ? 'block' : 'hidden'
			} fixed uppercase right-5 bottom-5`}>
			<button
				onClick={openForm}
				type='button'
				className='inline-flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 ease-in bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					className='w-5 h-5 md:mr-2'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
						clipRule='evenodd'
					/>
				</svg>
				<span className='hidden md:block'>ADD</span>
			</button>
		</span>
	);
}
