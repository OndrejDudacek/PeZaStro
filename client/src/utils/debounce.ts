export const debounce = (callback: Function, delay: number = 1000) => {
	let timeout: number;
	return (...args: unknown[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
