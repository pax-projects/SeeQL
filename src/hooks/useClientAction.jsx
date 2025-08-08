import { useEffect } from 'react';

const useClientAction = (callback) => {
	useEffect(() => {
		const events = ['click', 'dblclick', 'mousemove', 'wheel'];

		events.forEach(event => document.addEventListener(event, callback));

		return () => {
			events.forEach(event => document.removeEventListener(event, callback));
		};
	}, [callback]);
};

export { useClientAction };
