import React from 'react';

const defaultImage = 'https://www.ghibli.jp/gallery/chihiro042.jpg';

export default function PostDetails({ postDetails }: IProps) {
	return (
		<div className='grid w-full px-5 mt-8 overflow-hidden md:grid-cols-2'>
			<div className='p-4'>
				<div className='mb-2 text-xl font-bold text-center text-gray-700'>
					{postDetails?.title}
				</div>
				<p className='text-base text-gray-600'>{postDetails?.content}</p>
			</div>
			<img
				src={postDetails?.image || defaultImage}
				alt='alt'
				className='max-w-full'
			/>
		</div>
	);
}
