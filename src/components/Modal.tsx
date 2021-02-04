import React from 'react';
import { useSelector } from 'react-redux';

export default function Modal({ children }: IProps) {
	const { modalShow } = useSelector((state: RootState) => state.modalReducer);

	return (
		<div
			className={`${
				modalShow ? 'block' : 'hidden'
			} fixed top-0 left-0 grid w-full h-full bg-black bg-opacity-75 modal-container z-1 place-items-center`}>
			{children}
		</div>
	);
}
