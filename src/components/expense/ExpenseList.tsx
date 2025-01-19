import { useMemo } from "react"
import { format } from "date-fns"
import { Trash } from "lucide-react"

import { useBudget } from "@/context/budget/useBudget"
import { Button } from "@/components/ui/button"
import { Expense } from "@/lib/schema"

type ExpenseListProps = {
  budgetId: string
  expenses: Expense[]
}

export default function ExpenseList({ expenses, budgetId }: ExpenseListProps) {
  const { dispatch } = useBudget()
  const sortedExpenses = useMemo(
    () => expenses.sort((a, b) => b.date.getTime() - a.date.getTime()),
    [expenses]
  )

  const removeBudgetButton = (
    <Button
      variant="destructive"
      className="mt-3 w-fit"
      onClick={() => dispatch({ type: "REMOVE_BUDGET", payload: { budgetId } })}
    >
      Remove Budget
    </Button>
  )

  if (expenses.length === 0) {
    return (
      <>
        <p className="font-bol text-sm text-foreground">
          No expense found for this budget
        </p>
        {removeBudgetButton}
      </>
    )
  }

  return (
    <div>
      <ul className="space-y-4">
        {sortedExpenses.map((expense) => (
          <li
            key={expense.id}
            className="flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow-md sm:flex-row sm:items-center"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold">
                {expense.description}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(expense.date), "PPP")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-secondary">
                ${expense.amount}
              </span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_EXPENSE",
                    payload: { budgetId, expenseId: expense.id },
                  })
                }
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {removeBudgetButton}
    </div>
  )
}
