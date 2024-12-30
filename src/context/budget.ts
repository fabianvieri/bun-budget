import { createContext } from 'react';
import { BudgetAction } from './action';

export type Expense = {
	id: string;
	date: Date;
	amount: string;
	budgetId: string;
	description: string;
};

export type Budget = {
	id: string;
	name: string;
	maximumSpending: string;
	expenses: Expense[];
};

type BudgetContextValue = {
	budgets: Budget[];
	dispatch: React.Dispatch<BudgetAction>;
} | null;

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const BudgetContext = createContext<BudgetContextValue>(null);
