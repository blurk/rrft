import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
	getPaginateNext,
	getPaginatePrev,
	searchPost,
} from '../actions/postActions';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Post from '../components/Post';
import Search from '../components/Search';
import Sort from '../components/Sort';
import NotFoundSearch from './NotFoundSearch';

export default function PaginateScreen() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { pathname } = useLocation();

	const { pPosts, loading, pHasmore, nHasmore, error } = useSelector(
		(state: RootState) => state.postReducer
	);

	useEffect(() => {
		dispatch(getPaginateNext(8));

		// RE RENDER ON BUTTON NAV
		return history.listen(() => {
			if (history.action) {
				const params = window.location.search
					?.split('&')
					.map((s) => s.split('=')[1]);

				dispatch(searchPost(params[0], pathname.split('/')[1]));
			}
		});
	}, [dispatch]);

	const handleNext = () => {
		if (nHasmore) dispatch(getPaginateNext(8));
	};
	const handlePrev = () => {
		if (pHasmore) dispatch(getPaginatePrev(8));
	};

	return (
		<>
			{/* POST FORM */}
			<Modal>
				<Form />
			</Modal>
			{/* <AddPost /> */}
			<div>
				{/* MAIN */}
				<div className='flex flex-col items-center justify-around mt-5 md:flex-row md:items-center md:justify-around'>
					<Sort
						defaultOption={
							window.location.search?.split('&').map((s) => s.split('=')[1])[2]
						}
					/>
					<Search />
				</div>
				{loading ? (
					<Loader />
				) : error ? (
					<NotFoundSearch />
				) : pPosts?.length! > 0 ? (
					<>
						<div className='flex flex-wrap w-full mt-10'>
							{pPosts?.map((post) => (
								<Post key={post.id} post={post} />
							))}
						</div>
						<div className='flex items-center px-4 py-3 bg-white border-t border-gray-200 justify-items-center sm:px-6'>
							<div className='flex justify-around flex-1'>
								<button
									className='inline-flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 ease-in bg-gray-600 border border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
									onClick={handlePrev}
									disabled={!pHasmore}>
									Prev
								</button>
								<button
									className='inline-flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 ease-in bg-gray-600 border border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
									disabled={!nHasmore}
									onClick={handleNext}>
									Next
								</button>
							</div>
						</div>
					</>
				) : (
					<Loader />
				)}
			</div>
			<div className='flex flex-col items-center justify-around h-24 mt-5 md:flex-row md:items-center md:justify-around'>
				<Sort />
				<Search />
			</div>
		</>
	);
}
