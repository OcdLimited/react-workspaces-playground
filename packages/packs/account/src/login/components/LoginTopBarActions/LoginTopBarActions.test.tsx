import React from 'react';
import { render } from '@testing-library/react';
import { LoginTopBarActions } from './LoginTopBarActions';

it('should render', () => {
	const { container } = render(
		<LoginTopBarActions onLanguageChange={jest.fn()} languages={[]} currentCulture={{}} />,
	);

	expect(container).toMatchSnapshot();
});
