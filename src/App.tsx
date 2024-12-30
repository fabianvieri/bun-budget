import Header from './components/Header';
import BudgetList from './components/BudgetList';
import BudgetProvider from './context/BudgetProvider';

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
