import React from 'react';
import { render } from '@testing-library/react';
import { LoginForm } from '.';
import { Formik } from 'formik';

it('renders without crashing', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <LoginForm />}
			</Formik>
		</React.Fragment>,
	);
});

it('renders without crashing - isSubmitting', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <LoginForm isSubmitting={true} />}
			</Formik>
		</React.Fragment>,
	);
});
