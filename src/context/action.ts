import { Budget, Expense } from '@/lib/schema';

type AddBudgetAction = {
	type: 'ADD_BUDGET';
	payload: Pick<Budget, 'name' | 'maximumSpending'>;
};

type AddExpenseAction = {
	type: 'ADD_EXPENSE';
	payload: Omit<Expense, 'id'>;
};

type RemoveBudgetAction = {
	type: 'REMOVE_BUDGET';
	payload: { budgetId: string };
};

type RemoveExpenseAction = {
	type: 'REMOVE_EXPENSE';
	payload: { budgetId: string; expenseId: string };
};

export type BudgetAction =
	| AddBudgetAction
	| AddExpenseAction
	| RemoveBudgetAction
	| RemoveExpenseAction;
