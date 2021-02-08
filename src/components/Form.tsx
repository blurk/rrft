import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formAdd, hideModal } from '../actions/appActions';
import { addPost, updatePost } from '../actions/postActions';

export default function Form() {
	const dispatch = useDispatch();
	const { isUpdating, currentPost } = useSelector(
		(state: RootState) => state.formReducer
	);

	const [post, setPost] = useState<IFormState>({
		title: '',
		image: '',
		content: '',
	});

	const handleInputChange = (e: ChangeEvent) => {
		const { name, value } = e.target as HTMLInputElement;
		setPost((prevPost) => ({ ...prevPost, [name]: value }));
	};

	useEffect(() => {
		setPost((prevPost) => ({ ...prevPost, ...currentPost }));
	}, [currentPost]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (isUpdating) {
			dispatch(updatePost(currentPost?.id || '', post));
		} else {
			dispatch(addPost(post));
		}
		dispatch(hideModal());
		Object.keys(post).forEach((key) => (post[key] = ''));
	};

	const handleCancel = () => {
		Object.keys(post).forEach((key) => (post[key] = ''));
		dispatch(formAdd());
		dispatch(hideModal());
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col w-10/12 max-w-2xl p-4 mx-auto mt-4 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-lg'>
			<input
				className='p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
				spellCheck='false'
				placeholder='Title'
				name='title'
				type='text'
				onChange={handleInputChange}
				value={post?.title || ''}
				required
			/>
			<input
				className='p-2 mb-4 bg-gray-100 border border-gray-300 outline-none title'
				spellCheck='false'
				placeholder='Image link'
				name='image'
				type='text'
				value={post?.image || ''}
				onChange={handleInputChange}
			/>
			<textarea
				className='p-3 bg-gray-100 border border-gray-300 outline-none resize-none description h-60'
				spellCheck='false'
				name='content'
				value={post?.content || ''}
				onChange={handleInputChange}
				placeholder='Content of post'></textarea>

			<div className='flex mt-5'>
				<button
					type='button'
					className='p-1 px-4 ml-auto font-semibold text-gray-500 border border-gray-300 rounded-lg cursor-pointer btn focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
					onClick={handleCancel}>
					Cancel
				</button>
				<button
					type='submit'
					className='p-1 px-4 ml-2 font-semibold text-gray-200 bg-green-500 border border-green-500 rounded-lg cursor-pointer btn focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2'>
					{isUpdating ? 'UPDATE' : 'POST'}
				</button>
			</div>
		</form>
	);
}
