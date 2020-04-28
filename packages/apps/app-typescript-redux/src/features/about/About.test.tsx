import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import About from './About';

it('renders learn react link', () => {
	const { container, getByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<About />
			</MemoryRouter>
		</Provider>,
	);

	expect(getByText(/learn/i)).toBeInTheDocument();
	expect(container).toMatchSnapshot();
});
