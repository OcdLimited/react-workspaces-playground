import React from 'react';
import { Provider } from 'react-redux';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';
import withRouterDecorator from '../../routerDecorator';

import { Home } from './Home';
import { increment, decrement, incrementByAmount } from '../counter/counterSlice';
import { store } from '../../app/redux/store';

const withReduxSettings = {
	Provider,
	store,
	actions: [
		{
			name: 'increment',
			action: increment(),
		},
		{
			name: 'decrement',
			action: decrement(),
		},
		{
			name: 'incrementByAmount(100)',
			action: incrementByAmount(100),
		},
		{
			name: 'incrementByAmount(-100)',
			action: incrementByAmount(-100),
		},
	],
};
const withReduxDecorator = withRedux(addons)(withReduxSettings);

export default {
	title: 'Features/home',
	component: Home,
};

export const Default = () => <Home />;

Default.story = {
	decorators: [withReduxDecorator, withRouterDecorator],
};
