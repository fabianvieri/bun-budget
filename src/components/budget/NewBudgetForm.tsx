import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import AlertForm from '../ui/AlertForm';
import SubmitButton from '../ui/SubmitButton';
import { Input } from '@/components/ui/input';

import { useBudget } from '@/context/budget/useBudget';
import { createBudgetSchema, createBudgetValues } from '../../lib/schema';

export default function NewBudgetForm() {
	const { budgets, dispatch } = useBudget();
	const form = useForm<createBudgetValues>({
		resolver: zodResolver(createBudgetSchema),
		defaultValues: {
			name: '',
			maximumSpending: '',
		},
	});
	const {
		handleSubmit,
		control,
		setError,
		reset,
		formState: { isSubmitting, isSubmitSuccessful },
	} = form;

	const createBudget = (budget: createBudgetValues) => {
		const isExists = budgets.find(
			(b) =>
				b.name.trim().toLocaleLowerCase() ===
				budget.name.trim().toLocaleLowerCase()
		);
		if (isExists) {
			setError('name', {
				type: 'custom',
				message: 'Name is already exists',
			});
			return;
		}
		dispatch({ type: 'ADD_BUDGET', payload: budget });
		reset();
	};

	return (
		<Form {...form}>
			<form
				name="budgetForm"
				className="space-y-4"
				onSubmit={handleSubmit(createBudget)}
				noValidate
			>
				{isSubmitSuccessful && (
					<AlertForm
						title="Success"
						description="Your budget successfully created"
					/>
				)}
				<FormField
					control={control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									autoComplete="off"
									placeholder="Budget name"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="maximumSpending"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Maximum Spending</FormLabel>
							<FormControl>
								<Input
									className="appearance-none"
									type="number"
									placeholder="Budget maximum spending"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton loading={isSubmitting}>Submit</SubmitButton>
			</form>
		</Form>
	);
}
