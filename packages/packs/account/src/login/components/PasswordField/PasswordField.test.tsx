import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import { PasswordField } from '.';

it('renders without crashing', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <PasswordField required />}
			</Formik>
		</React.Fragment>,
	);
});

it('validation shows', () => {
	const { getByText } = render(
		<React.Fragment>
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
		</React.Fragment>,
	);

	expect(getByText('Required')).toBeInTheDocument();
});

it('can change to test', () => {
	const { getByLabelText } = render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <PasswordField />}
			</Formik>
		</React.Fragment>,
	);

	const toggle = getByLabelText(/toggle password visibility/i);
	fireEvent.click(toggle);
	fireEvent.mouseDown(toggle);
});
