import { useBudget } from "@/context/budget/useBudget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { currencyFormatter } from "@/lib/utils"

export default function TotalBudget() {
  const { budgets } = useBudget()

  if (budgets.length === 0) return null

  const totalExpenses = budgets.reduce(
    (total, b) =>
      b.expenses.reduce((etotal, e) => Number(e.amount) + etotal, 0) + total,
    0
  )

  const maxAllBudgets = budgets.reduce(
    (max, b) => Number(b.maximumSpending) + max,
    0
  )

  const progress = Math.min(
    Math.floor((totalExpenses / maxAllBudgets) * 100),
    100
  )

  return (
    <Card className="bg-secondary/20 text-secondary-foreground">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl">Total</CardTitle>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold">
              {currencyFormatter(totalExpenses)}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">
              {currencyFormatter(maxAllBudgets)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
      </CardContent>
    </Card>
  )
}
