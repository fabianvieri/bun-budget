import { createContext } from 'react';
import { Budget } from '@/lib/schema';
import { BudgetAction } from './action';
// import reducer from './reducer';

// type reducerTyoe = ReturnType<typeof reducer>;

type BudgetContextValue = {
	budgets: Budget[];
	dispatch: React.Dispatch<BudgetAction>;
} | null;

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const BudgetContext = createContext<BudgetContextValue>(null);
