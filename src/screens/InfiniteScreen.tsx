import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostInfinite } from '../actions/postActions';
import AddPost from '../components/AddPost';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Post from '../components/Post';

export default function InfiniteScreen() {
	const dispatch = useDispatch();

	const { iPosts, loading, hasmore, tracker } = useSelector(
		(state: RootState) => state.postReducer
	);

	useEffect(() => {
		dispatch(getPostInfinite(8));
	}, [dispatch]);

	const observer = useRef<any>();

	const lastElementRef = useCallback((node) => {
		if (loading) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (!hasmore) {
				return;
			}

			if (entries[0].isIntersecting && hasmore) {
				dispatch(getPostInfinite(8));
			}
		});
		if (node) observer.current.observe(node);
	}, []);

	return (
		<>
			{/* POST FORM */}
			<Modal>
				<Form />
			</Modal>
			{/* MAIN */}
			<div className='flex flex-wrap w-full mt-10'>
				{iPosts?.map((post) => {
					if (post.id === tracker)
						return (
							<Post post={post} key={post.id} forwardedRef={lastElementRef} />
						);
					return <Post key={post.id} post={post} />;
				})}
			</div>
			{loading && <Loader />}
			{/* ADD BUTTON */}
			<AddPost />
		</>
	);
}
