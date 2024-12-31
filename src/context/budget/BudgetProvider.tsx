import { PropsWithChildren } from 'react';
import reducer from './reducer';
import { BudgetContext } from '.';
import { Budget } from '@/lib/schema';
import { BudgetAction } from './action';
import useLocalStorage from '@/hooks/useLocalStorage';

const BudgetProvider = ({ children }: PropsWithChildren) => {
	const [budgets, dispatch] = useLocalStorage<Budget[], BudgetAction>(
		[],
		reducer,
		'budgets'
	);

	return (
		<BudgetContext.Provider
			value={{
				budgets,
				dispatch,
			}}
		>
			{children}
		</BudgetContext.Provider>
	);
};

export default BudgetProvider;
