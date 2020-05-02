import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Container } from '@material-ui/core';

import { TenancyDialog } from './TenancyDialog';

export default {
	title: 'Account/Login/Components/TenancyDialog',
};

export const Text = () => (
	<Container>
		<TenancyDialog
			tenantName={text('tenantName', '')}
			open={boolean('open', true)}
			onClose={action('onClose')}
			onChange={action('onTenantChanged')}
		/>
	</Container>
);

Text.story = {
	name: 'Default',
	decorators: [withKnobs],
};
