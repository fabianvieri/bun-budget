import Header from './components/Header';
import BudgetList from './components/BudgetList';
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
