import React from 'react';
import { Provider } from 'react-redux';
import addons from '@storybook/addons';
import withRedux from 'addon-redux/withRedux';

import { Counter } from './Counter';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { store } from '../../app/store';

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
	title: 'Features/count',
	component: Counter,
};

export const Default = () => <Counter />;

Default.story = {
	decorators: [withReduxDecorator],
};
