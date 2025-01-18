import { it, expect, describe } from 'bun:test';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
	it('should render app name', () => {
		render(<Header />);

		const heading = screen.getByRole('heading');
		expect(heading).toBeInTheDocument();
	});
});
