import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPost } from '../actions/postActions';

export default function Search() {
	const [timer, setTimer] = useState<any>(null);

	const dispatch = useDispatch();

	const handleInputChange = (e: ChangeEvent) => {
		const { value } = e.target as HTMLInputElement;
		searcher(value.trim());
	};

	const searcher = (search: string) => {
		clearTimeout(timer);
		setTimer(
			setTimeout(() => {
				dispatch(searchPost(search));
			}, 500)
		);
	};

	return (
		<div className='flex justify-center w-1/2 p-1 align-middle transition-colors border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-blue-500 max-h-11 md:w-auto'>
			<input
				type='text'
				id='filter'
				className='w-full md:px-4 focus:outline-none'
				placeholder='Filter by name'
				onChange={handleInputChange}
			/>
			<button className='hidden md:block'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
					className='w-5 h-5'>
					<path
						fillRule='evenodd'
						d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		</div>
	);
}
