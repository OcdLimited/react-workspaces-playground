import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import { PasswordField } from '.';

it('renders without crashing', () => {
	render(
		<>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <PasswordField required />}
			</Formik>
		</>,
	);
});

it('validation shows', () => {
	const { getByText } = render(
		<>
			<Formik
				onSubmit={() => {}}
				initialValues={{}}
				initialErrors={{
					password: 'Required',
				}}
				initialTouched={{
					password: true,
				}}
			>
				{() => <PasswordField required helperText="This is helper text" />}
			</Formik>
		</>,
	);

	expect(getByText('Required')).toBeInTheDocument();
});

it('can change to test', () => {
	const { getByLabelText } = render(
		<>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <PasswordField />}
			</Formik>
		</>,
	);

	const toggle = getByLabelText(/toggle password visibility/i);
	fireEvent.click(toggle);
	fireEvent.mouseDown(toggle);
});
