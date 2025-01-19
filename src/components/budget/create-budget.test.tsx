import { describe, it, expect } from "bun:test"
import userEvent from "@testing-library/user-event"
import { render, screen, within } from "@testing-library/react"

import NewBudgetForm from "./NewBudgetForm"
import BudgetProvider from "../../context/budget/BudgetProvider"

describe("Create a budget", () => {
  const setup = () => {
    render(
      <BudgetProvider>
        <NewBudgetForm />
      </BudgetProvider>
    )

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const spendingInput = screen.getByLabelText(
      /maximum spending/i
    ) as HTMLInputElement
    const submitButton = screen.getByRole("button", { name: "Submit" })

    return { nameInput, spendingInput, submitButton }
  }

  it("should render input fields", () => {
    const { nameInput, spendingInput, submitButton } = setup()
    expect(screen.getByRole("form")).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(spendingInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it("should create a new budget", async () => {
    const { nameInput, spendingInput, submitButton } = setup()
    const mockBudget = { name: "Food", maximumSpending: "10000" }

    await userEvent.type(nameInput, mockBudget.name)
    expect(nameInput.value).toBe(mockBudget.name)

    await userEvent.type(spendingInput, mockBudget.maximumSpending)
    expect(spendingInput.value).toBe(mockBudget.maximumSpending)

    await userEvent.click(submitButton)
    const alert = screen.getByRole("alert")
    const alertMessage = within(alert).getByText(
      "Your budget successfully created"
    )
    expect(alertMessage).toBeInTheDocument()
  })

  it("should show error message", async () => {
    const { submitButton } = setup()

    await userEvent.click(submitButton)
    expect(screen.getByText("Name is required")).toBeInTheDocument()
    expect(screen.getByText("Maximum spending is required")).toBeInTheDocument()
  })
})
