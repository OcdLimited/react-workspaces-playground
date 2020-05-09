import React from 'react';
import Container from '@material-ui/core/Container';

import { Copyright } from './Copyright';

export default {
	title: 'Shared Theme/Components/Copyright',
};

export const Default = () => (
	<Container component="main" maxWidth="xs">
		<Copyright />
	</Container>
);

Default.story = {
	name: 'Default',
};
