import React from 'react';
import { render } from '@testing-library/react';
import { UsernameField } from '.';
import { Formik } from 'formik';

it('renders without crashing', () => {
	render(
		<React.Fragment>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <UsernameField />}
			</Formik>
		</React.Fragment>,
	);
});

it('snapshot', () => {
	const { container } = render(
		<Formik onSubmit={() => {}} initialValues={{}}>
			{() => <UsernameField />}
		</Formik>,
	);
	expect(container).toMatchSnapshot();
});
