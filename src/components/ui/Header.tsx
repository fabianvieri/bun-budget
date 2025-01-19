import ModalButton from './ModalButton';
import NewBudgetForm from '../budget/NewBudgetForm';
import NewExpenseForm from '../expense/NewExpenseForm';

type HeaderProps = {
	title: string;
};

export default function Header({ title }: HeaderProps) {
	return (
		<header className="p-3 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold text-destructive">
					<a href="/">{title}</a>
				</h1>
				<div className="space-x-2">
					<ModalButton
						buttonVariant="destructive"
						buttonText="Expense +"
						title="New Expense"
						description="Add expense to your budget"
					>
						<NewExpenseForm />
					</ModalButton>
					<ModalButton
						buttonVariant="secondary"
						buttonText="Budget +"
						title="New Budget"
						description="Create your own custom budget"
					>
						<NewBudgetForm />
					</ModalButton>
				</div>
			</div>
		</header>
	);
}
