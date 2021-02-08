import React from 'react';

const defaultLink = 'https://www.ghibli.jp/gallery/ponyo016.jpg';
export default function PostDetails({ postDetails }: IProps) {
	const seconds = postDetails?.createdAt?.seconds;
	const date = new Date(seconds!);

	return (
		<>
			{postDetails && (
				<div className='grid w-full px-5 mt-8 overflow-hidden md:grid-cols-2'>
					<div className='p-4'>
						<h1 className='mb-2 text-xl font-bold text-center text-gray-700'>
							{postDetails?.title}
						</h1>
						<h4 className='mb-2 text-lg text-gray-600'>
							<strong>Created At</strong>: {date + ''}
						</h4>
						<p className='text-base text-gray-500'>{postDetails?.content}</p>
					</div>
					<img
						src={postDetails?.image || defaultLink}
						alt='alt'
						className='max-w-full'
					/>
				</div>
			)}
		</>
	);
}
