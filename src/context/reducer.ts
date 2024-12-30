import { nanoid } from 'nanoid';

import { Budget, UNCATEGORIZED_BUDGET_ID } from './budget';
import { BudgetAction } from './action';

const reducer = (state: Budget[], action: BudgetAction) => {
	const { type, payload } = action;

	switch (type) {
		case 'ADD_BUDGET': {
			return [
				...state,
				{
					id: nanoid(),
					expenses: [],
					...payload,
				},
			];
		}
		case 'ADD_EXPENSE': {
			const budgets = [...state];
			const isExists = budgets.find((b) => b.id === payload.budgetId);

			if (!isExists && payload.budgetId !== UNCATEGORIZED_BUDGET_ID)
				return state;

			if (!isExists && payload.budgetId === UNCATEGORIZED_BUDGET_ID) {
				budgets.push({
					id: UNCATEGORIZED_BUDGET_ID,
					name: 'Uncategorized',
					maximumSpending: '',
					expenses: [],
				});
			}

			const newBudgets = budgets.map((b) => {
				if (b.id === payload.budgetId) {
					const newBudget = {
						...b,
						expenses: [...b.expenses, { id: nanoid(), ...payload }],
					};
					return newBudget;
				}
				return b;
			});
			return newBudgets;
		}
		case 'REMOVE_BUDGET':
			return state.filter((b) => b.id !== payload.budgetId);
		case 'REMOVE_EXPENSE': {
			const budgets = [...state];
			const isExists = budgets.find((b) => b.id === payload.budgetId);

			if (!isExists) return state;

			const newBudgets = budgets.map((b) => {
				if (b.id === payload.budgetId) {
					const newExpenses = [...b.expenses].filter(
						(e) => e.id !== payload.expenseId
					);
					return {
						...b,
						expenses: newExpenses,
					};
				}
				return b;
			});
			return newBudgets;
		}
		default:
			return state;
	}
};

export default reducer;
