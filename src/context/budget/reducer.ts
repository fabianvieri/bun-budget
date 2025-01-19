import { nanoid } from "nanoid"

import { Budget } from "@/lib/schema"

import { UNCATEGORIZED_BUDGET_ID } from "."
import { BudgetAction } from "./action"

const reducer = (state: Budget[], action: BudgetAction) => {
  const { type, payload } = action

  switch (type) {
    case "ADD_BUDGET": {
      return [
        ...state,
        {
          id: nanoid(),
          expenses: [],
          ...payload,
        },
      ]
    }
    case "ADD_EXPENSE": {
      const budgetExists = state.find((b) => b.id === payload.budgetId)

      if (!budgetExists && payload.budgetId !== UNCATEGORIZED_BUDGET_ID)
        return state

      let updatedState = state

      if (!budgetExists && payload.budgetId === UNCATEGORIZED_BUDGET_ID) {
        updatedState = [
          ...state,
          {
            id: UNCATEGORIZED_BUDGET_ID,
            name: "Uncategorized",
            maximumSpending: "",
            expenses: [],
          },
        ]
      }

      return updatedState.map((b) => {
        if (b.id === payload.budgetId) {
          const newBudget = {
            ...b,
            expenses: [...b.expenses, { id: nanoid(), ...payload }],
          }
          return newBudget
        }
        return b
      })
    }
    case "REMOVE_BUDGET":
      return state.filter((b) => b.id !== payload.budgetId)
    case "REMOVE_EXPENSE": {
      const budgetExists = state.find((b) => b.id === payload.budgetId)

      if (!budgetExists) return state

      return state.map((b) => {
        if (b.id === payload.budgetId) {
          return {
            ...b,
            expenses: b.expenses.filter((e) => e.id !== payload.expenseId),
          }
        }
        return b
      })
    }
    default:
      return state
  }
}

export default reducer
