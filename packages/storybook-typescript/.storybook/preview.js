import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import './i18n';

addParameters({
	options: {
		theme: themes.light,
	},
});

configure(require.context('@ocdlimited/components-typescript/src', true, /.stories.tsx$/), module);
