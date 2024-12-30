import { z } from 'zod';

export const createBudgetSchema = z.object({
	name: z.string().min(1, 'Name is required').max(30, 'Name is too long'),
	maximumSpending: z
		.string()
		.min(1, 'Maximum spending is required')
		.regex(/^\d+$/, 'Must be a number')
		.refine((value) => Number(value) > 0, {
			message: 'Maximum spending must be greater than 0',
		}),
});

export type createBudgetValues = z.infer<typeof createBudgetSchema>;

export const createExpenseSchema = z.object({
	description: z
		.string()
		.min(1, 'Name is required')
		.max(50, 'Name is too long'),
	amount: z
		.string()
		.min(1, 'Amount is required')
		.regex(/^\d+$/, 'Must be a number')
		.refine((value) => Number(value) > 0, {
			message: 'Amount must be greater than 0',
		}),
	date: z
		.date()
		.refine((value) => value <= new Date() && value >= new Date('1900-01-01'), {
			message: 'Date is invalid',
		}),
	budgetId: z.string().min(1, 'Please choose budget for this expense'),
});

export type createExpenseValues = z.infer<typeof createExpenseSchema>;
