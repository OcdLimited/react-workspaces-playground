import React from 'react';
import { text } from '@storybook/addon-knobs';
import Container from '@material-ui/core/Container';

import { Title } from './Title';

export default {
	title: 'Shared Theme/Components/Title',
};

export const Default = () => (
	<Container component="main" maxWidth="xs">
		<Title>{text('title', 'This is a title')}</Title>
	</Container>
);

Default.story = {
	name: 'Default',
};
