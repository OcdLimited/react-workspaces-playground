import React from 'react';
import { render } from '@testing-library/react';
import { LoginPage } from './LoginPage';

it('snapshot', () => {
	const { container } = render(<LoginPage />);
	expect(container).toMatchSnapshot();
});
