import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';

it('should render', () => {
	const { getByTestId } = render(<ThemeSwitcher themes={[]} />);

	expect(getByTestId(/open-menu/i)).toBeInTheDocument();
});

it('should render', () => {
	const onSelectTheme = jest.fn();
	const { getByTestId, getByText } = render(
		<ThemeSwitcher themes={['theme1', 'theme2']} currentTheme="theme1" onSelectTheme={onSelectTheme} />,
	);

	const openMenu = getByTestId(/open-menu/i);

	expect(openMenu).toBeInTheDocument();

	act(() => {
		fireEvent.click(openMenu);
	});

	const theme1Option = getByText('theme1');
	const theme2Option = getByText('theme2');

	expect(theme1Option).toBeInTheDocument();
	expect(theme2Option).toBeInTheDocument();

	act(() => {
		fireEvent.click(theme1Option);
		fireEvent.click(theme2Option);
	});

	expect(onSelectTheme).toBeCalled();
});
