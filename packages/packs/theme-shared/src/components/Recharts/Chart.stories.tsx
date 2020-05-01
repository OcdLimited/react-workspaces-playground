import React from 'react';
import Container from '@material-ui/core/Container';

import { Chart } from './Chart';

export default {
	title: 'Shared Theme/Components/Chart',
};

export const Default = () => (
	<Container component="main" maxWidth="xs">
		<Chart />
	</Container>
);

Default.story = {
	name: 'Default',
};
