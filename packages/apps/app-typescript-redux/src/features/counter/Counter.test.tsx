import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import { Counter } from './Counter';

it('increment', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Counter />
		</Provider>,
	);
	const increment = getByText(/\+/i);
	expect(increment).toBeInTheDocument();
	fireEvent.click(increment);
});

it('decrement', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Counter />
		</Provider>,
	);
	const increment = getByText(/-/i);
	expect(increment).toBeInTheDocument();
	fireEvent.click(increment);
});

it('Add Amount', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Counter />
		</Provider>,
	);
	const add = getByText(/Add Amount/i);
	expect(add).toBeInTheDocument();
	fireEvent.click(add);
});

it('Add Async', () => {
	const { getByText } = render(
		<Provider store={store}>
			<Counter />
		</Provider>,
	);
	const add = getByText(/Add Async/i);
	expect(add).toBeInTheDocument();
	fireEvent.click(add);
});

it('Set increment amount', () => {
	const { getByLabelText } = render(
		<Provider store={store}>
			<Counter />
		</Provider>,
	);
	const add = getByLabelText(/Set increment amount/i);
	expect(add).toBeInTheDocument();
	fireEvent.change(add, { target: { value: 'a' } });
});
