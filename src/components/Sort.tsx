import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortPost } from '../actions/postActions';

export default function Sort() {
	const [timer, setTimer] = useState<any>(null);
	const dispatch = useDispatch();

	const handleSelectChange = (e: ChangeEvent) => {
		const { value } = e.target as HTMLInputElement;

		const orderBy = value.split('-')[0];
		const sort = value.split('-')[1];

		sorter(orderBy, sort);
	};

	const sorter = (orderBy: string, sort: string) => {
		clearTimeout(timer);
		setTimer(
			setTimeout(() => {
				dispatch(sortPost(orderBy, sort as FirebaseSort));
			}, 500)
		);
	};

	return (
		<div className='my-2 text-center rounded-lg outline-none'>
			<label htmlFor='sorter'>Sort</label>
			<select
				name='sorter'
				id='sorter'
				className='ml-1 border border-gray-500'
				onChange={handleSelectChange}>
				<option value='createdAt-desc'>Lastest(Default)</option>
				<option value='createdAt-asc'>Oldest</option>
				<option value='title-asc'>A-Z</option>
				<option value='title-desc'>Z-A</option>
			</select>
		</div>
	);
}
