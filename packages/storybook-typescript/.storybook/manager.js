import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import '@storybook/addon-links/register';

addParameters({
	options: {
		theme: themes.dark,
	},
});
