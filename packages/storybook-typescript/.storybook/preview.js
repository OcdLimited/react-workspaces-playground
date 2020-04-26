import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

configure(require.context('@ocdlimited/components-typescript/src', true, /.stories.tsx$/), module);

addDecorator(muiTheme());
