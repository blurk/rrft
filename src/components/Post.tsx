import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formUpdate, showModal } from '../actions/appActions';
import { deletePost } from '../actions/postActions';

const defaultImage = 'https://www.ghibli.jp/gallery/chihiro042.jpg';

export default function Post({ post }: IProps) {
	const dispatch = useDispatch();

	const handleDelete = () => {
		const isDelete = window.confirm('Delete?');
		isDelete && dispatch(deletePost(post?.id!));
	};

	const handleUpdate = () => {
		dispatch(showModal());
		dispatch(formUpdate(post!));
	};

	return (
		<>
			{post && (
				<div className='m-auto my-5 overflow-hidden rounded-lg shadow-lg h-96 w-60 md:w-80'>
					<div className='block w-full h-3/4'>
						<img
							alt='alt'
							src={post.image || defaultImage}
							className='object-cover w-full max-h-40'
						/>
						<div className='w-full p-4 bg-white dark:bg-gray-800'>
							<p className='font-medium text-indigo-500 text-md'></p>
							<p className='mb-2 text-xl font-medium text-gray-800 dark:text-white'>
								{post.title}
							</p>
							<p className='font-light text-gray-400 truncate dark:text-gray-300 text-md'>
								{post.content}
							</p>
						</div>
					</div>
					{/* ACTIONS */}
					<div className='flex items-center justify-center gap-2 px-4 h-1/4'>
						{/* EDIT BUTTON */}
						<button
							onClick={handleUpdate}
							type='button'
							className='flex items-center justify-center w-2/5 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-600 rounded-lg shadow-md white hover:bg-yellow-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 '>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								className='w-5 h-5 mr-2'
								fill='currentColor'>
								<path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
							</svg>
							Edit
						</button>
						{/* DELETE BUTTON */}
						<button
							onClick={handleDelete}
							type='button'
							className='flex items-center justify-center w-2/5 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md white hover:bg-red-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 '>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								className='w-5 h-5 mr-2'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
									clipRule='evenodd'
								/>
							</svg>
							Delete
						</button>
						{/* DETAILS BUTTON */}
						<Link
							to={`/posts/${post.id}`}
							type='button'
							className='flex items-center justify-center w-2/5 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md white hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 '>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								className='w-5 h-5 mr-2'
								fill='currentColor'>
								<path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
								<path
									fillRule='evenodd'
									d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
									clipRule='evenodd'
								/>
							</svg>
							View
						</Link>
					</div>
				</div>
			)}
		</>
	);
}
