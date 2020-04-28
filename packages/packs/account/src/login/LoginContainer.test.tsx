import React from 'react';
import { render } from '@testing-library/react';
import { LoginContainer } from '.';

it('renders without crashing', () => {
	render(<LoginContainer />);
});

it('snapshot', () => {
	const { container } = render(<LoginContainer />);
	expect(container).toMatchSnapshot();
});
