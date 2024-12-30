import { PropsWithChildren, useReducer } from 'react';
import reducer from './reducer';
import { BudgetContext } from './budget';

const BudgetProvider = ({ children }: PropsWithChildren) => {
	const [budgets, dispatch] = useReducer(reducer, []);
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
