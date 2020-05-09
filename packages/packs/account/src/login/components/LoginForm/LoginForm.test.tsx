import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { LoginForm } from '.';

it('renders without crashing', () => {
	render(
		<>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <LoginForm />}
			</Formik>
		</>,
	);
});

it('renders without crashing - isSubmitting', () => {
	render(
		<>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <LoginForm isSubmitting />}
			</Formik>
		</>,
	);
});
