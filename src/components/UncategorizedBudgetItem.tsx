import ModalButton from './ModalButton';
import NewExpenseForm from './NewExpenseForm';
import ExpenseList from './ExpenseList';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import { currencyFormatter } from '@/lib/utils';
import { useBudget } from '@/context/use-budget';
import { UNCATEGORIZED_BUDGET_ID } from '@/context/budget';

export default function UncategorizedBudgetItem() {
	const { budgets } = useBudget();
	const uncategorizedBudget = budgets.find(
		(b) => b.id === UNCATEGORIZED_BUDGET_ID
	);

	if (!uncategorizedBudget) return null;

	const totalExpenses = uncategorizedBudget.expenses.reduce(
		(total, e) => Number(e.amount) + total,
		0
	);

	return (
		<Card className="bg-primary/20 text-secondary-foreground">
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle className="text-xl">Uncategorized</CardTitle>
					<span className="font-bold text-xl">
						{currencyFormatter(totalExpenses)}
					</span>
				</div>
			</CardHeader>
			<CardFooter>
				<div className="ml-auto flex gap-2">
					<ModalButton
						buttonText="Add Expense"
						title="New Expense"
						description="Add your expenses to uncategorized budget"
					>
						<NewExpenseForm defaultBudgetId={UNCATEGORIZED_BUDGET_ID} />
					</ModalButton>
					<ModalButton buttonText="View Expense" title="Uncategorized Expenses">
						<ExpenseList
							expenses={uncategorizedBudget.expenses}
							budgetId={UNCATEGORIZED_BUDGET_ID}
						/>
					</ModalButton>
				</div>
			</CardFooter>
		</Card>
	);
}
