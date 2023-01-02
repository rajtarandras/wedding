export const toSafeNumber = (val: string): number | undefined => {
	return val !== "" && !isNaN(Number(val)) ? Number(val) : undefined;
};
