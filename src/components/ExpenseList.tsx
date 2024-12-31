import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { Expense } from '@/lib/schema';
import { useBudget } from '@/context/use-budget';
import { useMemo } from 'react';

type ExpenseListProps = {
	budgetId: string;
	expenses: Expense[];
};

export default function ExpenseList({ expenses, budgetId }: ExpenseListProps) {
	const { dispatch } = useBudget();
	const sortedExpenses = useMemo(
		() => expenses.sort((a, b) => b.date.getTime() - a.date.getTime()),
		[expenses]
	);

	const removeBudgetButton = (
		<Button
			variant="destructive"
			className="mt-3 w-fit"
			onClick={() => dispatch({ type: 'REMOVE_BUDGET', payload: { budgetId } })}
		>
			Remove Budget
		</Button>
	);

	if (expenses.length === 0) {
		return (
			<>
				<p className="text-foreground font-bol text-sm">
					No expense found for this budget
				</p>
				{removeBudgetButton}
			</>
		);
	}

	return (
		<div>
			<ul className="space-y-4">
				{sortedExpenses.map((expense) => (
					<li
						key={expense.id}
						className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-md"
					>
						<div className="flex flex-col">
							<span className="font-semibold text-lg">
								{expense.description}
							</span>
							<span className="text-gray-500 text-sm">
								{format(new Date(expense.date), 'PPP')}
							</span>
						</div>
						<div className="flex items-center gap-3">
							<span className="font-bold text-secondary text-lg">
								${expense.amount}
							</span>
							<button
								className="text-red-500 hover:text-red-700"
								onClick={() =>
									dispatch({
										type: 'REMOVE_EXPENSE',
										payload: { budgetId, expenseId: expense.id },
									})
								}
							>
								<Trash className="w-5 h-5" />
							</button>
						</div>
					</li>
				))}
			</ul>
			{removeBudgetButton}
		</div>
	);
}
