import React from 'react';
import { render } from '@testing-library/react';
import { Title } from './Title';

it('should render', () => {
	const { findByText } = render(<Title>This is a title</Title>);
	expect(findByText(/This is a title/i));
});
