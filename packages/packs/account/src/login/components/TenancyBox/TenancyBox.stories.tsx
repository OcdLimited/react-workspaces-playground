import React from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Container } from '@material-ui/core';

import { TenancyBox } from './TenancyBox';

export default {
	title: 'Account/Login/Components/TenancyBox',
};

export const Text = () => (
	<Container>
		<TenancyBox
			tenantName={text('tenantName', '')}
			visible={boolean('visible', true)}
			onTenantChanged={action('onTenantChanged')}
		/>
	</Container>
);

Text.story = {
	name: 'TenancyBox',
	decorators: [withKnobs],
};
