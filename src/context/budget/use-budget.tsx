import { useContext } from 'react';
import { BudgetContext } from '.';

export const useBudget = () => {
	const context = useContext(BudgetContext);
	if (context == null) {
		throw Error('Please use context inside provider.');
	}
	return context;
};
