import BudgeItem from './BudgetItem';
import TotalBudget from './TotalBudget';
import { useBudget } from '@/context/use-budget';
import { UNCATEGORIZED_BUDGET_ID } from '@/context/budget';
import UncategorizedBudgetItem from './UncategorizedBudgetItem';

export default function BudgetList() {
	const { budgets } = useBudget();
	const categorizedBudgets = budgets.filter(
		(b) => b.id !== UNCATEGORIZED_BUDGET_ID
	);

	return (
		<div className="container mx-auto my-5 p-3 sm:p-0">
			<div className="flex flex-col gap-4">
				{categorizedBudgets.map((budget) => (
					<BudgeItem key={budget.id} {...budget} />
				))}
				<UncategorizedBudgetItem />
				<TotalBudget />
			</div>
		</div>
	);
}
