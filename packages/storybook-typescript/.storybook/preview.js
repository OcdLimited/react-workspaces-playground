import { configure } from '@storybook/react';

import './i18n';

configure(require.context('@ocdlimited/abp.react.account/src', true, /.stories.tsx$/), module);
configure(require.context('@ocdlimited/abp.react.core/src', true, /.stories.tsx$/), module);
