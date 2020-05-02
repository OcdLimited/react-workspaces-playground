import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { TenancyBox } from './TenancyBox';
import { TenancyDialog } from './TenancyDialog';

jest.mock('./TenancyDialog', () => ({
	TenancyDialog: jest.fn().mockImplementation(() => 'asdasd'),
}));

it('should render', () => {
	const onChange = jest.fn();

	render(<TenancyBox visible />);
	const { getByText } = render(<TenancyBox visible tenantName="" onTenantChanged={onChange} />);

	const switchButton = getByText(/Switch/i);

	expect(switchButton).toBeInTheDocument();

	act(() => {
		fireEvent.click(switchButton);
	});

	const dialogInstance = TenancyDialog.mock.calls[1][0];

	act(() => {
		dialogInstance.onChange();
		dialogInstance.onClose();
	});

	expect(onChange).toBeCalled();
});

it('should nothing when visible is false', () => {
	const { queryByText } = render(<TenancyBox visible={false} tenantName="" onTenantChanged={jest.fn()} />);

	expect(queryByText(/Tenant/i)).not.toBeInTheDocument();
});
