import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import { UsernameField } from '.';

it('renders without crashing', () => {
	render(
		<>
			<Formik onSubmit={() => {}} initialValues={{}}>
				{() => <UsernameField />}
			</Formik>
		</>,
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
