import { ChangeEvent, useState } from 'react';

export const useForm = (initialValues: IFormState) => {
	const [values, setValues] = useState(initialValues);

	return [
		values,
		(e: ChangeEvent) => {
			setValues({
				...values,
				[(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
			});
		},
	] as const;
};
