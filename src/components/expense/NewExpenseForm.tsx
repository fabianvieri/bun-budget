import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { UNCATEGORIZED_BUDGET_ID } from "@/context/budget"
import { useBudget } from "@/context/budget/useBudget"
import AlertForm from "@/components/ui/AlertForm"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SubmitButton from "@/components/ui/SubmitButton"
import { createExpenseSchema, createExpenseValues } from "@/lib/schema"

type NewExpenseProps = {
  defaultBudgetId?: string
}

export default function NewExpenseForm({
  defaultBudgetId = "",
}: NewExpenseProps) {
  const { budgets, dispatch } = useBudget()
  const categorizedBudgets = budgets.filter(
    (b) => b.id !== UNCATEGORIZED_BUDGET_ID
  )

  const form = useForm<createExpenseValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: "",
      description: "",
      budgetId: defaultBudgetId,
    },
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const createExpense = (expense: createExpenseValues) => {
    dispatch({ type: "ADD_EXPENSE", payload: expense })
    reset()
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(createExpense)}
        noValidate
      >
        {isSubmitSuccessful && (
          <AlertForm
            title="Success"
            description="Your expense successfully added"
          />
        )}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Expense description"
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  className="appearance-none"
                  type="number"
                  placeholder="Expense amount"
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="date">Date</FormLabel>
              <FormControl>
                <DatePicker
                  id="date"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="budgetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="budget">Budget</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={defaultBudgetId}
                >
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categorizedBudgets.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                      <SelectItem
                        key={UNCATEGORIZED_BUDGET_ID}
                        value={UNCATEGORIZED_BUDGET_ID}
                      >
                        Uncategorized
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={isSubmitting}>Submit</SubmitButton>
      </form>
    </Form>
  )
}
