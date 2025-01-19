import NewBudgetForm from "@/components/budget/NewBudgetForm"
import NewExpenseForm from "@/components/expense/NewExpenseForm"

import ModalButton from "./ModalButton"

type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="p-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
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
  )
}
