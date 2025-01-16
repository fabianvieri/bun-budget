import Header from './components/ui/Header';
import BudgetList from './components/budget/BudgetList';
import BudgetProvider from './context/budget/BudgetProvider';

function App() {
	return (
		<main>
			<BudgetProvider>
				<Header />
				<BudgetList />
			</BudgetProvider>
		</main>
	);
}

export default App;
