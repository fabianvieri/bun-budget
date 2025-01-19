import BudgetList from "./components/budget/BudgetList"
import Header from "./components/ui/Header"
import BudgetProvider from "./context/budget/BudgetProvider"

function App() {
  return (
    <main>
      <BudgetProvider>
        <Header title="Budget" />
        <BudgetList />
      </BudgetProvider>
    </main>
  )
}

export default App
