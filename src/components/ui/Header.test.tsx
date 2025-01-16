import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom/vitest';

describe('Header', () => {
	it('should render app name', () => {
		render(<Header />);

		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/Budgets/);
	});
});
