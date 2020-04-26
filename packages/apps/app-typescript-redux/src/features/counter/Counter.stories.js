import React from 'react';
import { Counter } from './Counter';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';

const withReduxSettings = {
	Provider,
	store,
};
const withReduxDecorator = withRedux(addons)(withReduxSettings);

export default {
	title: 'Features/count',
	component: Counter,
};

export const Default = () => <Counter />;

Default.story = {
	decorators: [withReduxDecorator],
};
