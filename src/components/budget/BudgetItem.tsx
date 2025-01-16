import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';
import ExpenseList from '../expense/ExpenseList';
import ModalButton from '../ui/ModalButton';
import NewExpenseForm from '../expense/NewExpenseForm';
import { Budget } from '@/lib/schema';
import { currencyFormatter } from '@/lib/utils';

export default function BudgetItem({
	name,
	maximumSpending,
	expenses,
	id,
}: Budget) {
	const totalExpenses = expenses.reduce(
		(total, e) => Number(e.amount) + total,
		0
	);

	const percentage = Math.min(
		Math.floor((totalExpenses / Number(maximumSpending)) * 100),
		100
	);

	const isOverBudget = totalExpenses > Number(maximumSpending);

	return (
		<Card className={`relative ${isOverBudget ? 'bg-destructive/40' : ''}`}>
			<CardHeader>
				<div className="flex justify-between">
					<div className="flex gap-2">
						<CardTitle className="text-xl">{name}</CardTitle>
					</div>
					<div className="flex items-center gap-1">
						<span className="font-bold text-xl">
							{currencyFormatter(Number(totalExpenses))}
						</span>
						<span className="text-muted-foreground">/</span>
						<span className="text-muted-foreground text-sm">
							{currencyFormatter(Number(maximumSpending))}
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Progress value={percentage} />
			</CardContent>
			<CardFooter className="flex justify-between items-center">
				<div className="flex gap-2">
					<ModalButton
						buttonText="Add Expense"
						title="New Expense"
						description="Add your expenses to this budget"
					>
						<NewExpenseForm defaultBudgetId={id} />
					</ModalButton>
					<ModalButton buttonText="View Expense" title={`${name}'s Expenses`}>
						<ExpenseList expenses={expenses} budgetId={id} />
					</ModalButton>
				</div>
			</CardFooter>
		</Card>
	);
}
