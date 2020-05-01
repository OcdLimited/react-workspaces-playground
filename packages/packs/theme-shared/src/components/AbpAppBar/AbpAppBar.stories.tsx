import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Container from '@material-ui/core/Container';

import { AbpAppBar } from './AbpAppBar';

export default {
	title: 'Shared Theme/Components/AbpAppBar',
};

export const Default = () => (
	<MemoryRouter>
		<Container component="main" maxWidth="xs">
			<AbpAppBar open={boolean('open', false)} onOpen={action('onClose')} />
		</Container>
	</MemoryRouter>
);

Default.story = {
	name: 'Default',
};
