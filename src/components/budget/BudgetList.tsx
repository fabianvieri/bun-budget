import BudgetItem from './BudgetItem';
import TotalBudget from './TotalBudget';
import { useBudget } from '@/context/budget/useBudget';
import { UNCATEGORIZED_BUDGET_ID } from '@/context/budget';
import UncategorizedBudgetItem from './UncategorizedBudgetItem';

export default function BudgetList() {
	const { budgets } = useBudget();
	const categorizedBudgets = budgets.filter(
		(b) => b.id !== UNCATEGORIZED_BUDGET_ID
	);

	return (
		<div className="container mx-auto my-5 p-3 sm:p-0">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{budgets.length === 0 ? (
					<p className="text-center text-primary mt-2">
						No budgets available. Please add a budget to get started.
					</p>
				) : (
					categorizedBudgets.map((budget) => (
						<BudgetItem key={budget.id} {...budget} />
					))
				)}
				<UncategorizedBudgetItem />
				<TotalBudget />
			</div>
		</div>
	);
}
