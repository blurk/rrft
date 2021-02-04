import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<nav className='px-8 pt-2 bg-white shadow-md'>
			<div className='flex justify-center -mb-px'>
				<div className='py-3 mr-8 text-lg font-bold tracking-wide text-black no-underline uppercase border-b-2 text-teal-dark border-teal-dark'>
					<Link to='/'>Home</Link>
				</div>
			</div>
		</nav>
	);
}
