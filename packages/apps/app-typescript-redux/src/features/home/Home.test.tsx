import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import Home from './Home';

it('renders', () => {
	const { container, getByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		</Provider>,
	);

	expect(getByText(/Today/i)).toBeInTheDocument();
	expect(container).toMatchSnapshot();
});
