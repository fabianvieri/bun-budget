import { Dispatch, useEffect, useReducer } from 'react';

export default function useLocalStorage<T, A>(
	initialValue: T,
	reducer: (state: T, action: A) => T,
	key: string
): [T, Dispatch<A>] {
	const [state, dispatch] = useReducer(reducer, initialValue, (initial) => {
		const json = localStorage.getItem(key);
		if (json) return JSON.parse(json);
		return initial;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [state]);

	return [state, dispatch];
}
