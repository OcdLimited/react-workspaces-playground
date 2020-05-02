import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { TenancyDialog } from './TenancyDialog';

it('should render', () => {
	const onClose = jest.fn();
	const onChange = jest.fn();

	const { getByText, getByTestId } = render(<TenancyDialog open={true} onClose={onClose} onChange={onChange} />);

	const textField = getByTestId('name');

	expect(textField).toBeInTheDocument();

	act(() => {
		fireEvent.change(textField, {
			currentTarget: {
				value: 'value',
			},
		});
	});

	const saveButton = getByText(/Save/i);

	expect(saveButton).toBeInTheDocument();

	act(() => {
		fireEvent.click(saveButton, {});
	});

	expect(onChange).toBeCalled();

	const cancelButton = getByText(/Cancel/i);

	act(() => {
		fireEvent.click(cancelButton, {});
	});

	expect(onClose).toBeCalled();
});
