import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../actions/postActions';
import AddPost from '../components/AddPost';
import Form from '../components/Form';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Post from '../components/Post';
export default function HomeScreen() {
	const dispatch = useDispatch();
	const postReducer = useSelector((state: RootState) => state.postReducer);
	const { posts, loading, error } = postReducer;

	const { modalShow } = useSelector((state: RootState) => state.modalReducer);

	useEffect(() => {
		dispatch(listPosts());
	}, [dispatch]);

	return (
		<>
			<h1 className='font-bold text-center text-gray-700 text-8xl'>Posts</h1>
			{/* POST FORM */}
			{modalShow && (
				<Modal>
					<Form />
				</Modal>
			)}
			{/* LIST OF POSTS */}
			<div className='flex flex-wrap w-full mt-10 '>
				{loading ? (
					<Loader />
				) : error ? (
					<p>Error: {error + ''}</p>
				) : (
					posts?.map((post) => <Post key={post.id} post={post} />)
				)}
				{/* ADD BUTTON */}
				<AddPost />
			</div>
		</>
	);
}
