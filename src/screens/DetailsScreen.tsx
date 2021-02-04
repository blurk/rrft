import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getPostDetails } from '../actions/postActions';
import Loader from '../components/Loader';
import PostDetails from '../components/PostDetails';

export default function DetailsScreen() {
	const { id } = useParams<IParams>();
	const dispatch = useDispatch();

	const history = useHistory();

	const { postDetails, loading, error } = useSelector(
		(state: RootState) => state.postReducer
	);

	if (error) {
		history.push('/404');
	}

	useEffect(() => {
		dispatch(getPostDetails(id!));
	}, [dispatch, id]);

	return (
		<>{loading ? <Loader /> : <PostDetails postDetails={postDetails} />}</>
	);
}
