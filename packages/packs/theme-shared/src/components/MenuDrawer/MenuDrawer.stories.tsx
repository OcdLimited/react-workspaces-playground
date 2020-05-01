import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Container from '@material-ui/core/Container';

import { MenuDrawer } from './MenuDrawer';

export default {
	title: 'Shared Theme/Components/MenuDrawer',
};

export const Default = () => (
	<MemoryRouter>
		<Container component="main" maxWidth="xs">
			<MenuDrawer open={boolean('open', false)} onClose={action('onClose')} />
		</Container>
	</MemoryRouter>
);

Default.story = {
	name: 'Default',
};
