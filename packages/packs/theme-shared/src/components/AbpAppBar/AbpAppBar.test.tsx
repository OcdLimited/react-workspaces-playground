import React from 'react';
import { render } from '@testing-library/react';
import { AbpAppBar } from './AbpAppBar';

it('should render', () => {
	render(<AbpAppBar open onOpen={jest.fn()} />);
});
