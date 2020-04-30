import React from 'react';
import { select } from '@storybook/addon-knobs';
import Container from '@material-ui/core/Container';

import { Loading } from './Loading';

export default {
	title: 'Core/Components/Loading',
};

const color = {
	inherit: 'inherit',
	primary: 'primary',
	secondary: 'secondary',
};

export const Default = () => (
	<Container component="main" maxWidth="xs">
		<Loading color={select('color', color, 'primary')} />
	</Container>
);

Default.story = {
	name: 'Default',
};
