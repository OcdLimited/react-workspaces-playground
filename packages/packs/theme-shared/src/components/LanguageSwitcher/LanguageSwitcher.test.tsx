import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { languages, currentCulture } from './testData';

it('should render', () => {
	const onLanguageChange = jest.fn();

	const { getByText, getByTestId } = render(
		<LanguageSwitcher onSelectLanguage={onLanguageChange} languages={languages} currentCulture={currentCulture} />,
	);

	act(() => {
		fireEvent.click(getByTestId('open-language'));
	});

	expect(getByText(/Português/i)).toBeInTheDocument();

	act(() => {
		fireEvent.click(getByText(/Português/i));
	});

	expect(onLanguageChange).toBeCalled();
});
