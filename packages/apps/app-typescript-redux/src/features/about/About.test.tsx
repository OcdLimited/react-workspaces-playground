import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import About from './About';

it('renders learn react link', () => {
	const { getByText } = render(
		<Provider store={store}>
			<About />
		</Provider>,
	);

	expect(getByText(/learn/i)).toBeInTheDocument();
});
