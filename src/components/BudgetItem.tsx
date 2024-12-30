import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import ExpenseList from './ExpenseList';
import ModalButton from './ModalButton';
import NewExpenseForm from './NewExpenseForm';
import { Budget } from '@/context/budget';
import { currencyFormatter } from '@/lib/utils';

export default function BudgeItem({
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

	return (
		<Card className="relative">
			<CardHeader>
				<div className="flex justify-between">
					<div>
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
				<div>
					{totalExpenses > Number(maximumSpending) && (
						<Badge variant="destructive">overbudget</Badge>
					)}
				</div>
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
