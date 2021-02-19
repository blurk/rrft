import React from 'react';
import { ReactComponent as Cat } from '../assets/images/cat.svg';

export default function NotFoundSearch() {
	return (
		<div className='flex items-center h-screen bg-gray-50'>
			<div className='container flex flex-col items-center justify-center text-gray-700 md:flex-row'>
				<div className='max-w-md'>
					<p className='text-2xl font-light leading-normal md:text-3xl'>
						Not Found
					</p>
				</div>
				<Cat className='w-1/2' />
			</div>
		</div>
	);
}
