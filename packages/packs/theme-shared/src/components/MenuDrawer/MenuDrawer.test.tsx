import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { MenuDrawer } from './MenuDrawer';

it('should render', () => {
	render(
		<MemoryRouter initialEntries={['/home']}>
			<MenuDrawer open onClose={jest.fn()} />
		</MemoryRouter>,
	);
});
