import React from 'react';
import { render } from '@testing-library/react';
import { LoginTopBarActions } from './LoginTopBarActions';

it('should render', () => {
	const { container } = render(
		<LoginTopBarActions
			onSelectLanguage={jest.fn()}
			languages={[]}
			currentCulture={{}}
			currentTheme=""
			themes={[]}
		/>,
	);

	expect(container).toMatchSnapshot();
});
