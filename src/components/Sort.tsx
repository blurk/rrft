import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { sortPost } from '../actions/postActions';
let timer: any = null;
export default function Sort({ defaultOption }: IProps) {
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const { sort, orderBy, search } = useSelector(
		(state: RootState) => state.postReducer
	);
	let optionValue = `${orderBy}-${defaultOption || sort}`;

	const handleSelectChange = (e: ChangeEvent) => {
		const { value } = e.target as HTMLInputElement;

		const orderBy = value.split('-')[0];
		const sort = value.split('-')[1];

		sorter(orderBy, sort);
	};

	const sorter = (orderBy: string, sort: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			dispatch(sortPost(orderBy, sort as FirebaseSort, pathname.split('/')[1]));
			history.push({
				pathname: pathname,
				search: search ? `title=${search}&orderBy=${orderBy}&sort=${sort}` : '',
			});
		}, 100);
	};

	return (
		<div className='my-2 text-center rounded-lg outline-none'>
			<label htmlFor='sorter'>Sort</label>
			<select
				name='sorter'
				className='ml-1 border border-gray-500'
				value={optionValue}
				onChange={handleSelectChange}>
				<option value='createdAt-desc'>Lastest(Default)</option>
				<option value='createdAt-asc'>Oldest</option>
				<option value='title-asc'>A-Z</option>
				<option value='title-desc'>Z-A</option>
			</select>
		</div>
	);
}
