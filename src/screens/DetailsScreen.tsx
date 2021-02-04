import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../actions/postActions';
import Loader from '../components/Loader';
import PostDetails from '../components/PostDetails';

export default function DetailsScreen() {
	const { id } = useParams<IParams>();
	const dispatch = useDispatch();

	const { postDetails, loading, error } = useSelector(
		(state: RootState) => state.postReducer
	);

	useEffect(() => {
		dispatch(getPostDetails(id!));
	}, [dispatch, id]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<p>{'' + error}</p>
			) : (
				<PostDetails postDetails={postDetails} />
			)}
		</>
	);
}
