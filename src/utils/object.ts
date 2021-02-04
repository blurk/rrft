export const updateObject = (target: IndexObject, data: IndexObject) => {
	const cloneTarget = JSON.parse(JSON.stringify(target));
	Object.keys(cloneTarget).forEach((key: string) => {
		if (data[key] !== cloneTarget[key]) {
			cloneTarget[key] = data[key];
		}
	});

	return cloneTarget;
};
