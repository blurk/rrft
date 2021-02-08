import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaginateNext, getPaginatePrev } from '../actions/postActions';
import AddPost from '../components/AddPost';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Post from '../components/Post';

export default function PaginateScreen() {
	const dispatch = useDispatch();

	const { pPosts, loading, pHasmore, nHasmore } = useSelector(
		(state: RootState) => state.postReducer
	);

	useEffect(() => {
		dispatch(getPaginateNext(8));
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
			<AddPost />
			<div>
				{/* MAIN */}
				{loading ? (
					<Loader />
				) : (
					<div className='flex flex-wrap w-full mt-10'>
						{pPosts?.map((post) => (
							<Post key={post.id} post={post} />
						))}
					</div>
				)}
			</div>
			<div className='flex items-center px-4 py-3 bg-white border-t border-gray-200 justify-items-center sm:px-6'>
				<div className='flex justify-around flex-1'>
					<button
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 ease-in bg-gray-600 border border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						onClick={handlePrev}
						disabled={!pHasmore}>
						Prev
					</button>
					<button
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-white transition duration-200 ease-in bg-gray-600 border border-transparent rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						disabled={!nHasmore}
						onClick={handleNext}>
						Next
					</button>
				</div>
			</div>
		</>
	);
}
