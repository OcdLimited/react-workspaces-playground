import React from 'react';
import { render } from '@testing-library/react';
import { SignInForm } from '.';
import { Formik } from 'formik';

it('renders without crashing', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <SignInForm />}
			</Formik>
		</React.Fragment>,
	);
});
