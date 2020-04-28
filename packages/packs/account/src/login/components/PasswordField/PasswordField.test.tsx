import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import { PasswordField } from '.';

it('renders without crashing', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <PasswordField />}
			</Formik>
		</React.Fragment>,
	);
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
