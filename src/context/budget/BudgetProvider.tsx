import { PropsWithChildren } from "react"

import useLocalStorage from "@/hooks/useLocalStorage"
import { Budget } from "@/lib/schema"

import { BudgetContext } from "."
import { BudgetAction } from "./action"
import reducer from "./reducer"

const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [budgets, dispatch] = useLocalStorage<Budget[], BudgetAction>(
    [],
    reducer,
    "budgets"
  )

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export default BudgetProvider
